# Product Spec: 60 Walker St — Household Portal

## 1. Vision
A clean, authoritative household reference portal for residents of 60 Walker St. Roommates and visitors can quickly find house rules, utility costs, provider contacts, Wi-Fi info, and cleaning schedules. Reference images (the original artifact designs) are downloadable. No accounts needed — this is a shared info board.

---

## 2. UX Architecture

### 2.1 User Personas
- **Resident (Primary)**: Current roommate who needs quick access to house rules, utility costs, and contacts. Visits site 2-3x/month. Wants speed and clarity.
- **New Roommate (Secondary)**: First-time visitor learning household norms. Needs complete picture. Likely bookmarks the site.
- **Guest/Temporary (Tertiary)**: Needs Wi-Fi password and basic house rules. One-time or infrequent visitor.

### 2.2 Core User Journeys

#### Journey A: New Roommate Onboarding
1. **Discover**: Lands on welcome page (hero: address + house icon)
2. **Orient**: Reviews house rules and communication guidelines
3. **Access**: Checks Wi-Fi credentials and shared supplies list
4. **Schedule**: Notes cleaning rotation schedule
5. **Preserve**: Downloads reference artifacts for offline access
6. **Outcome**: Fully informed on how the household operates

#### Journey B: Paying Utilities
1. **Locate**: Opens utilities section (nav or scroll)
2. **Review**: Reviews monthly cost breakdown (propane, electric, internet)
3. **Calculate**: Notes per-person share and provider contact info
4. **Confirm**: Confirms pay-by date (15th) and payment method (Venmo/Zelle)
5. **Outcome**: Knows what to pay, to whom, and by when

#### Journey C: Issue Reporting
1. **Identify**: Problem detected (outage, leak, etc.)
2. **Navigate**: Opens contact section
3. **Match**: Finds correct provider number (NYSEG, Village of Walden, Blue Flame)
4. **Act**: Reports issue and informs housemates
5. **Outcome**: Issue routed to correct party quickly

#### Journey D: Download Reference (Offline Access)
1. **Find**: Locates download section
2. **Select**: Chooses which artifact (Welcome Summary, Utilities Share, Utilities & Contact)
3. **Download**: Clicks download button
4. **Outcome**: PNG saved to device for offline sharing

### 2.3 Task Flows

#### Flow: Onboarding → Find Wi-Fi
Hero → Scroll to Welcome → Locate Wi-Fi card → Read credentials → (Optional) Copy password

#### Flow: Pay Utilities
Hero → Scroll to Utilities → Read cost table → Note per-person share → Note pay-by date → Click payment method info

#### Flow: Report Outage
Hero → Scroll to Contact → Identify utility type → Click provider number → Report issue

### 2.4 Screen / Route Map
- `/` — Single-page application (all content on one scrollable page)
  - Hero section (address, branding)
  - Welcome / House Rules section
  - Utilities Dashboard section
  - Contact & Action Hub section
  - Download Artifacts section
  - Footer

### 2.5 UX Constraints
- **Speed**: Page must load < 2s on 3G; all content visible without JS
- **Friction**: Max 1 click to find any information; max 2 scrolls to reach any section
- **Clarity**: Every card must have a clear heading and icon
- **Accessibility**: WCAG 2.1 AA minimum (contrast ratios, keyboard nav, alt text)

### 2.6 Failure / Error UX
- **No JS**: Content renders as static HTML; download links work as native `<a download>`
- **Slow Network**: Skeleton placeholders not needed (content is lightweight text); progressive enhancement
- **Missing Image**: Alt text displayed; download button disabled with explanation
- **Broken Download**: Toast notification: "Download failed. Try again or save the image directly."

---

## 3. Interaction Model

### 3.1 States Required (Per Section)
| State | Behavior |
|-------|----------|
| **Idle** | Content visible, all interactive elements ready |
| **Hover** | Cards lift slightly (shadow), buttons highlight |
| **Active/Click** | Buttons depress, phone numbers copy to clipboard |
| **Loading** | Not applicable (SSG; no async data fetch) |
| **Success** | Copy confirmation toast: "Copied to clipboard!" |
| **Error** | Toast: "Action failed. Please try again." |
| **Empty** | Not applicable (all content is static) |

### 3.2 Transitions
- Smooth scroll to anchor sections on nav click
- Cards fade in on scroll into viewport (optional enhancement)
- Toast notifications slide in/out

### 3.3 Feedback Loops
- **Copy phone number**: Button briefly shows "Copied!" then reverts
- **Download artifact**: Filename appears in browser download bar
- **Hover on card**: Visual elevation change ( Tailwind shadow transition)

### 3.4 Edge Cases
- **Mobile tap on phone number**: Triggers `tel:` link (call) + copy fallback
- **No clipboard API**: Graceful fallback — number remains selectable text
- **Print view**: All sections print cleanly (CSS print media query)

---

## 4. UI System

### 4.1 Components
- **HeroBanner**: Address, tagline, house icon, background gradient
- **InfoCard**: Icon + heading + bullet list (reusable for rules, Wi-Fi, supplies)
- **CostTable**: Styled table with provider, cost, share columns
- **ContactCard**: Provider name + phone + click-to-copy button
- **ActionButton**: Green CTA buttons (Report Outage, Confirm Bills, etc.)
- **DownloadButton**: Navy button with download icon + filename
- **SectionHeader**: Navy bar with icon + section title (reusable)

### 4.2 Layouts
- **Single column** (mobile): Stack all sections vertically
- **Two column** (tablet+): Side-by-side cards where appropriate
- **Hero full-width**: Always spans full viewport width

### 4.3 Reusability
- `InfoCard` used for: Communication Guidelines, Cleaning Rotation, Shared Supplies, Wi-Fi Info, Reminders
- `SectionHeader` used for every major section
- `ActionButton` styled consistently across all CTAs

---

## 5. Feature Definitions
### Feature 1: Welcome / House Rules
- **Description**: Communication guidelines, cleaning rotation, shared supplies, Wi-Fi info, key reminders
- **User Value**: Establishes household norms and prevents conflicts
- **Acceptance Criteria**: All 5 rule categories visible at a glance; icons for each

### Feature 2: Utilities Dashboard
- **Description**: Monthly cost table (propane, electric, internet), provider info, per-person share, payment instructions
- **User Value**: Transparent cost sharing; no surprises
- **Acceptance Criteria**: Table with totals, percentages, per-person amounts; pay-by date prominent

### Feature 3: Contact & Action Hub
- **Description**: Provider contact numbers, payment methods, outage reporting checklist, action buttons
- **User Value**: One-stop shop for household emergencies and payments
- **Acceptance Criteria**: Click-to-call or copy numbers; action buttons (Report Outage, Confirm Bills, etc.)

### Feature 4: Downloadable Artifacts
- **Description**: Original reference images available as downloadable PNG files
- **User Value**: Offline access; shareable with new roommates
- **Acceptance Criteria**: Download button per artifact; files served from `public/artifacts/`

---

## 6. Non-Goals
- No user accounts / auth (v1.0)
- No payment processing (info only; Venmo/Zelle handled externally)
- No real-time chat or notifications
- No CMS (content updates via code edits)
- No backend API (fully static)
