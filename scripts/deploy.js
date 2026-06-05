#!/usr/bin/env node
/**
 * Automated Deployment Script
 * Based on external expert research (30+ sources)
 * Strategy: Anonymous → PAT → Fallback platforms
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const DIST_DIR = path.resolve(__dirname, "../dist");
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

function log(level, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      ...options,
    });
    return { success: true, output: result };
  } catch (error) {
    return {
      success: false,
      output: error.stdout || "",
      error: error.stderr || error.message,
      code: error.status,
    };
  }
}

async function deployWithRetry(deployFn, strategyName) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    log("INFO", `${strategyName} attempt ${attempt}/${MAX_RETRIES}`);
    const result = await deployFn();

    if (result.success) {
      log("SUCCESS", `${strategyName} succeeded: ${result.url}`);
      return result;
    }

    log("WARN", `${strategyName} attempt ${attempt} failed: ${result.error}`);

    if (attempt < MAX_RETRIES) {
      const delay = RETRY_DELAY_MS * attempt;
      log("INFO", `Waiting ${delay}ms before retry...`);
      await sleep(delay);
    }
  }

  log("ERROR", `${strategyName} failed after ${MAX_RETRIES} attempts`);
  return { success: false };
}

// Strategy 1: Netlify Anonymous Deploy (zero auth)
async function deployNetlifyAnonymous() {
  const command = `npx netlify deploy --allow-anonymous --create-site="60-walker-st" --dir="${DIST_DIR}" --prod --json --message="Automated deploy via script"`;
  const result = runCommand(command, { cwd: path.resolve(__dirname, "..") });

  if (result.success) {
    try {
      const data = JSON.parse(result.output);
      return { success: true, url: data.deploy_url || data.url, data };
    } catch {
      // Parse output for URL
      const urlMatch = result.output.match(/https:\/\/[^\s]+/);
      return { success: true, url: urlMatch ? urlMatch[0] : "unknown", output: result.output };
    }
  }

  return { success: false, error: result.error };
}

// Strategy 2: Netlify PAT Deploy
async function deployNetlifyPAT() {
  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (!token) {
    return { success: false, error: "NETLIFY_AUTH_TOKEN not set" };
  }

  const siteId = process.env.NETLIFY_SITE_ID || "";
  const siteFlag = siteId ? `--site=${siteId}` : "";
  const command = `npx netlify deploy --auth=${token} ${siteFlag} --dir="${DIST_DIR}" --prod --json --message="Automated deploy via PAT"`;

  const result = runCommand(command, { cwd: path.resolve(__dirname, "..") });

  if (result.success) {
    try {
      const data = JSON.parse(result.output);
      return { success: true, url: data.deploy_url || data.url, data };
    } catch {
      const urlMatch = result.output.match(/https:\/\/[^\s]+/);
      return { success: true, url: urlMatch ? urlMatch[0] : "unknown", output: result.output };
    }
  }

  return { success: false, error: result.error };
}

// Strategy 3: Surge.sh Fallback
async function deploySurge() {
  const token = process.env.SURGE_TOKEN;
  const login = process.env.SURGE_LOGIN;

  if (!token || !login) {
    return { success: false, error: "SURGE_TOKEN or SURGE_LOGIN not set" };
  }

  const domain = process.env.SURGE_DOMAIN || `60walkerst-${Date.now()}.surge.sh`;
  const command = `npx surge "${DIST_DIR}" ${domain} --token ${token}`;

  const result = runCommand(command, {
    cwd: path.resolve(__dirname, ".."),
    env: { ...process.env, SURGE_LOGIN: login, SURGE_TOKEN: token },
  });

  if (result.success) {
    return { success: true, url: `https://${domain}` };
  }

  return { success: false, error: result.error };
}

// Strategy 4: Vercel Fallback
async function deployVercel() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return { success: false, error: "VERCEL_TOKEN not set" };
  }

  const command = `npx vercel --yes --token=${token} --cwd="${DIST_DIR}" --prod`;
  const result = runCommand(command, { cwd: path.resolve(__dirname, "..") });

  if (result.success) {
    const urlMatch = result.output.match(/https:\/\/[^\s]+/);
    return { success: true, url: urlMatch ? urlMatch[0] : "unknown" };
  }

  return { success: false, error: result.error };
}

// Main deployment orchestrator
async function deploy() {
  log("INFO", "=== Automated Deployment Started ===");
  log("INFO", `Dist directory: ${DIST_DIR}`);

  // Verify dist exists
  if (!fs.existsSync(DIST_DIR)) {
    log("ERROR", `Dist directory not found: ${DIST_DIR}`);
    log("INFO", "Run 'npm run build' first.");
    process.exit(1);
  }

  const strategies = [
    { name: "Netlify Anonymous", fn: deployNetlifyAnonymous },
    { name: "Netlify PAT", fn: deployNetlifyPAT },
    { name: "Surge.sh", fn: deploySurge },
    { name: "Vercel", fn: deployVercel },
  ];

  for (const strategy of strategies) {
    log("INFO", `--- Attempting: ${strategy.name} ---`);
    const result = await deployWithRetry(strategy.fn, strategy.name);

    if (result.success) {
      log("SUCCESS", "=== Deployment Complete ===");
      log("SUCCESS", `URL: ${result.url}`);

      // Write deploy info to file for later reference
      const deployInfo = {
        timestamp: new Date().toISOString(),
        strategy: strategy.name,
        url: result.url,
        data: result.data || null,
      };
      fs.writeFileSync(
        path.resolve(__dirname, "../.deploy-info.json"),
        JSON.stringify(deployInfo, null, 2)
      );

      console.log(`\n✅ Deployed to: ${result.url}`);
      process.exit(0);
    }

    log("WARN", `${strategy.name} exhausted. Moving to next strategy...`);
  }

  log("ERROR", "=== All deployment strategies failed ===");
  log("INFO", "To fix:");
  log("INFO", "1. For Netlify PAT: Set NETLIFY_AUTH_TOKEN environment variable");
  log("INFO", "   Generate at: https://app.netlify.com/user/applications");
  log("INFO", "2. For Surge.sh: Set SURGE_LOGIN and SURGE_TOKEN");
  log("INFO", "   Run: npx surge token");
  log("INFO", "3. For Vercel: Set VERCEL_TOKEN");
  log("INFO", "   Run: npx vercel login && npx vercel token");
  process.exit(1);
}

deploy().catch((err) => {
  log("ERROR", `Unexpected error: ${err.message}`);
  process.exit(1);
});
