# SKILL.md — Add Applicant

> **Owner:** Code Agent
> **Trigger:** User says "add a new applicant" and provides details
> **Goal:** Produce a functionally identical applicant entry that renders correctly across all views without breaking the site
> **Quality Target:** 97% first-time-right, zero runtime errors, no visual regressions

---

## 1. Pre-Flight Checklist

Before touching any code, verify:

- [ ] You have read this entire SKILL.md
- [ ] You have read `app/data/applicants.ts` in full (interface definitions + Alaina example)
- [ ] You have read `app/sections/applicant-detail.tsx` in full (understands how data is consumed)
- [ ] You have read `app/sections/applicants-list.tsx` in full (understands list rendering)
- [ ] You have the user's complete applicant details (all fields listed in Section 3)
- [ ] You have the applicant's photos/documents and know their filenames
- [ ] You have confirmed the applicant's `status` and `journeyStage` values

**If any item is missing, STOP and ask the user.** Never guess field values.

---

## 2. Architecture Overview

### Data Flow

```
app/data/applicants.ts  ──exports──>  app/sections/applicants-list.tsx  (list view)
    │                                       │
    └──exports──>  app/sections/applicant-detail.tsx  (detail view)
```

**Key principle:** `applicants.ts` is the **single source of truth**. The UI is purely presentational. Adding a new applicant means appending a complete `Applicant` object to the `applicants` array.

### Applicant ID Convention

```
format: "{first-name}-{last-name}"
example: "alaina-carnell"
rules:
  - all lowercase
  - hyphen between first and last name
  - no spaces, no special characters
  - must be unique across the applicants array
```

### Initials Convention

```
format: "{first-initial}{last-initial}"
example: "AC"
rules:
  - uppercase
  - exactly 2 characters
```

---

## 3. Required Fields — Complete Checklist

### Top-Level Applicant Fields

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `id` | string | `"alaina-carnell"` | See ID convention |
| `name` | string | `"Alaina Carnell"` | Full name, title case |
| `initials` | string | `"AC"` | See initials convention |
| `address` | string | `"60 Walker St"` | Target property |
| `moveInDate` | string | `"06/01/2026"` | MM/DD/YYYY |
| `submittedDate` | string | `"06/03/2026"` | MM/DD/YYYY |
| `status` | enum | `"complete"` | See valid statuses |
| `journeyStage` | number | `2` | 0-4, see stage map |
| `email` | string | `"4acarnail@gmail.com"` | Lowercase |
| `phone` | string | `"(314) 566-0963"` | (XXX) XXX-XXXX |
| `attachments` | array | `[...]` | See Attachment spec |
| `notes` | string | `"Application complete..."` | Internal notes |
| `applicationDetails` | object | `{...}` | See Section 5 |
| `screeningReport` | object | `{...}` | See Section 6 |

### Valid Status Values

```typescript
"complete" | "pending" | "screening" | "verified" | "accepted" | "rejected"
```

- `complete` — Application filled, awaiting screening
- `pending` — Partial, needs more info
- `screening` — Screening ordered/processing
- `verified` — Income/docs verified
- `accepted` — Approved
- `rejected` — Denied

### Journey Stage Map

| Stage | Label | Description | When to Use |
|-------|-------|-------------|-------------|
| 0 | Lead | Pre-screening info | Inquiry only |
| 1 | Application | Industry-standard questions | Submitted, awaiting screening |
| 2 | Screening | Credit/background received | Screening report in hand |
| 3 | Verification | Proof of income verified | All docs verified |
| 4 | Decision | Accept or reject | Final decision made |

**Rule:** `journeyStage` must be ≥ the numeric stage implied by `status`.

---

## 4. Attachment Specification

```typescript
interface Attachment {
  id: string;        // unique, camelCase, e.g. "earnings"
  label: string;     // human-readable, e.g. "Earnings Statement"
  filename: string;  // exact file name with extension
  url: string;       // "/applicants/{applicantId}/{filename}" or "#"
}
```

### Attachment File Storage

1. Create folder: `public/applicants/{applicant-id}/`
2. Place all photos/documents in this folder
3. Set `url` to `"/applicants/{applicant-id}/{filename}"`
4. **Verify exact filename matches** (case-sensitive)

### Common Attachment Types

| Type | Suggested ID | Label | Typical Filename |
|------|-------------|-------|---------------|
| Earnings | `earnings` | Earnings Statement | `Earnings_Statement.pdf` |
| Government ID | `idPhoto` | ID Photo | `ID_Photo.jpg` |
| Additional | `photo1`, `photo2` | Additional Doc | `IMG_####.jpg` |
| Reference | `reference` | Reference Letter | `Reference_Letter.pdf` |
| Photo ID | `photoId` | Photo ID | `Photo_ID.jpg` |

**If no attachments, use empty array `[]`.** Never omit the field.

---

## 5. Application Details — Deep Structure

```typescript
interface ApplicationDetails {
  dateOfBirth: string;           // "Month DD, YYYY"
  applicationStatus: string;     // "Complete" | "Pending" | "In Progress"
  desiredMoveInDate: string;       // MM/DD/YYYY
  totalOccupants: string;          // "{adults} adult | {minors} minor"
  selfReportedIncome: string;      // "$X,XXX / month"
  animals: string;                // "No" | "Yes — {description}"
  smoking: string;                // "No" | "Yes"
  addresses: ApplicationAddress[];
  totalIncome: string;            // "$X,XXX.00 / month"
  jobs: ApplicationJob[];
  financialInstitution: string;   // Bank name or "N/A"
  emergencyContact: { name: string; relationship: string; phone: string; };
  vehicle: { make: string; color: string; year: string; };
  backgroundQuestions: { question: string; answer: string; }[];
  otherInfo: { specialRequests: string; howDidYouHear: string; comments: string; };
}
```

### ApplicationAddress

```typescript
{
  label: "Current Address" | "Past Address" | "Previous Address";
  street: string;                // e.g. "29 Boniface Dr"
  cityState: string;              // e.g. "Pine Bush, NY 12566"
  type: "Rental" | "Owned" | "Living with Family";
  rent: string;                   // e.g. "$600 rent / month" or "N/A"
  reasonForMoving: string;
  landlordName: string;
  landlordPhone: string;          // (XXX) XXX-XXXX
}
```

**Rule:** Provide at least 1 address (Current). Provide 2 if prior rental history exists. Never provide 0.

### ApplicationJob

```typescript
{
  employer: string;
  jobTitle: string;
  period: string;                 // "Jan 2023 - Present"
  income: string;                 // "$X,XXX.00 / month"
  isCurrent: boolean;
  referenceName: string;
  referencePhone: string;         // (XXX) XXX-XXXX
}
```

**Rule:** Provide at least 1 job. Mark current jobs `isCurrent: true`. If only 1 job, `isCurrent` must be `true`.

### Background Questions (Exact Text — Do Not Modify)

```typescript
[
  {
    question: "Have you (or any person you have named on this application) ever been evicted from a tenancy or left owing money?",
    answer: "No" | "Yes"
  },
  {
    question: "Have you or any member of your household ever been convicted of (or pled guilty or no contest to) any criminal offense(s) other than a minor infraction(s)?",
    answer: "No" | "Yes"
  },
  {
    question: "Have you (or any person you have named on this application) ever filed for or been involved in a bankruptcy, been foreclosed on, or been a defendant in a civil suit?",
    answer: "No" | "Yes"
  }
]
```

**Rule:** These 3 questions are hardcoded in the UI. The `question` text must match exactly.

### OtherInfo

```typescript
{
  specialRequests: string;      // "No" | actual request text
  howDidYouHear: string;         // "Apartments.com" | "Zillow" | etc.
  comments: string;              // "No response given." | actual comment
}
```

---

## 6. Screening Report — Deep Structure

Include only if `journeyStage >= 2`. For earlier stages, use the minimal placeholder in Section 9.

```typescript
interface ScreeningReport {
  creditScore: number;            // 300-850
  creditScoreLabel: string;       // "Poor" | "Fair" | "Good" | "Very Good" | "Excellent"
  receivedDate: string;           // MM/DD/YYYY
  scoreFactors: string[];         // 1-4 strings from credit bureau
  evictions: number;              // count
  collections: number;            // count
  publicRecords: number;          // count
  criminalHistory: number;        // count
  addresses: { address: string; status: string; date: string; }[];
  employers: { employer: string; jobTitle: string; date: string; }[];
  profileSummary: {
    tradelines: number;
    collections: string;          // "-" or count
    publicRecords: string;        // "-" or count
    inquiries: number;
    negativeTradelines: number;
    historicalNegatives: number;
    occurrencesOfNegatives: number;
  };
  tradelineSummaries: {
    creditType: string;           // "Revolving" | "Installment" | "Closed w/ Bal" | "Total"
    count: number;
    highCredit: string;           // "$X,XXX" or "-"
    creditLimit: string;
    balance: string;
    pastDue: string;
    payment: string;
    available: string;            // "XX%" or "-"
  }[];
  tradelines: {
    name: string;                 // creditor name
    type: string;                 // "Revolving" | "Revolving Min" | "Installment"
    terms: string;                // "Individual Account" | "Joint Contract Liability"
    status: string;               // "Open" | "Closed"
    opened: string;               // "MMM YYYY"
    lastPaid: string;             // "MMM YYYY" or "-"
    usage: string;                // "XX% of $X,XXX" or "-"
    payment: string;              // "$X" or "-"
    pastDue: string;              // "$X,XXX" or "-"
  }[];
}
```

### Credit Score Label Mapping

| Score Range | Label |
|-------------|-------|
| 300-579 | Poor |
| 580-669 | Fair |
| 670-739 | Good |
| 740-799 | Very Good |
| 800-850 | Excellent |

### Tradeline Summary Total Row

Always include a "Total" row as the last entry in `tradelineSummaries`:
- `creditType: "Total"`
- `count` = sum of all non-Total counts
- `highCredit`, `creditLimit`, `balance`, `pastDue` = summed values
- `payment` = summed payments
- `available` = overall percentage

---

## 7. Step-by-Step Implementation Procedure

### Phase A: Data Entry

1. Open `app/data/applicants.ts`
2. Scroll to bottom of `applicants` array
3. Add comma after last applicant's closing brace
4. Paste new applicant object using Alaina as template
5. Replace every field with new data
6. Grep file for proposed `id` — must be unique
7. Verify `status` + `journeyStage` consistency
8. Save

### Phase B: Asset Handling

1. Create `public/applicants/{applicant-id}/`
2. Copy photos/documents into folder
3. Verify exact filename matches `attachments[].filename`
4. Update `attachments[].url` from `"#"` to `"/applicants/{applicant-id}/{filename}"`

### Phase C: UI Verification (No Code Changes)

The UI auto-picks up new applicants. Verify:

1. **Applicants List** — card appears with correct name, status badge, initials
2. **Applicant Detail** — all 4 tabs render correctly:
   - Summary: profile, timeline, attachments, notes
   - Application: personal info, addresses, jobs, background questions
   - Screening: credit score ring, profile summary, tradelines table
   - Messages: placeholder renders
3. **Edge cases:**
   - Empty attachments → no crash, no cards shown
   - Zero jobs → application tab renders, job section may be empty
   - No screening report → screening tab handles minimal data

### Phase D: Build & Test

```bash
npm run build
```
Expected: Zero TypeScript errors, zero ESLint warnings.

```bash
npm test
```
Expected: All existing tests pass. New applicant does not break tests.

---

## 8. Common Pitfalls — DO NOT DO THESE

| # | Pitfall | Why It Breaks | Prevention |
|---|---------|---------------|------------|
| 1 | Omit `screeningReport` field | TypeScript error — field is required | Always include, use minimal placeholder if needed |
| 2 | Wrong `status` + `journeyStage` combo | UI shows inconsistent state | Use Section 3 stage mapping |
| 3 | Duplicate `id` | Only first applicant renders | Grep file for proposed ID before saving |
| 4 | Mismatched `attachments[].filename` | Download links 404 | List directory contents before setting filenames |
| 5 | Wrong `backgroundQuestions` text | UI displays mismatched Q&A | Copy question text exactly from Section 5 |
| 6 | `totalIncome` doesn't sum `jobs[].income` | Manual data entry error | Verify arithmetic |
| 7 | `creditScore` outside 300-850 | Visual credit ring may break | Validate score is within FICO range |
| 8 | `tradelineSummaries` missing "Total" row | Table looks incomplete | Always add Total row as last element |
| 9 | `submittedDate` > `moveInDate` | Illogical timeline | Verify dates make sense |
| 10 | `journeyStage` as string | TypeScript error | Use number, not string |
| 11 | `screeningReport.employers` left empty | Employment card renders with title but no content | Copy from `applicationDetails.jobs` or use conditional rendering |
| 12 | `inquiries` as string `"-"` | TypeScript error — field typed as `number` | Use `0` for no inquiries; update interface if strings needed |
| 13 | Documents in `docs/` but not `public/` | Attachment URLs 404 | Copy files to `public/` AND update `attachments[].url` to absolute paths |
| 14 | Credit score bar is solid green | Does not match reference rainbow gradient with arrow | Compare rendered output to user's reference screenshot before declaring done |

---

## 9. Minimal Screening Report (Early-Stage Applicants)

Use this when applicant hasn't reached screening stage:

```typescript
screeningReport: {
  creditScore: 0,
  creditScoreLabel: "—",
  receivedDate: "—",
  scoreFactors: [],
  evictions: 0,
  collections: 0,
  publicRecords: 0,
  criminalHistory: 0,
  addresses: [],
  employers: [],
  profileSummary: {
    tradelines: 0,
    collections: "-",
    publicRecords: "-",
    inquiries: 0,
    negativeTradelines: 0,
    historicalNegatives: 0,
    occurrencesOfNegatives: 0,
  },
  tradelineSummaries: [
    { creditType: "Revolving", count: 0, highCredit: "-", creditLimit: "-", balance: "-", pastDue: "-", payment: "-", available: "-" },
    { creditType: "Installment", count: 0, highCredit: "-", creditLimit: "-", balance: "-", pastDue: "-", payment: "-", available: "-" },
    { creditType: "Closed w/ Bal", count: 0, highCredit: "-", creditLimit: "-", balance: "-", pastDue: "-", payment: "-", available: "-" },
    { creditType: "Total", count: 0, highCredit: "-", creditLimit: "-", balance: "-", pastDue: "-", payment: "-", available: "-" },
  ],
  tradelines: [],
}
```

---

## 10. Verification Checklist Before Declaring Done

- [ ] New applicant object is valid TypeScript (no red squiggles)
- [ ] `id` is unique in the file
- [ ] `status` and `journeyStage` are logically consistent
- [ ] `totalIncome` equals sum of `jobs` incomes
- [ ] `attachments[].filename` matches actual files on disk
- [ ] `backgroundQuestions[].question` text matches Section 5 exactly
- [ ] `tradelineSummaries` has "Total" row as last element
- [ ] `creditScore` is between 300-850 (or 0 for placeholder)
- [ ] `public/applicants/{id}/` directory exists with files
- [ ] `npm run build` passes with zero errors
- [ ] `npm test` passes with all existing tests green
- [ ] Manual UI check: applicant card renders, all detail tabs render
- [ ] `screeningReport.employers` is populated (not empty) if applicant has job history
- [ ] `inquiries` is a number (0 for none), never a string
- [ ] All documents copied to `public/` and `attachments[].url` points to real paths
- [ ] Credit score bar matches reference design (rainbow gradient + arrow)

---

*Skill version 1.1 — 60 Walker St Household Portal*
*Last updated: 2026-06-14*
