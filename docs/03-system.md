# 03-system.md — System Documentation

## Component Map

| Component | Location | Props | Usage Context |
|-----------|----------|-------|---------------|
| Home (page) | `app/page.tsx` | — | Root SPA controller, manages ViewMode state |
| HeroSection | `app/sections/hero.tsx` | `onSelectApplicant, onSelectTenant` | Landing page with background image + CTAs |
| ApplicantSection | `app/sections/applicant.tsx` | `onBack` | Two-view applicant info: About Home / About Area |
| TenantSection | `app/sections/tenant.tsx` | `onBack` | Tenant portal hub with nested view router |
| WelcomeContent | `app/sections/welcome.tsx` | — | House rules grid + key reminder |
| UtilitiesContent | `app/sections/utilities.tsx` | — | Cost table + payment card + reminder |
| ContactContent | `app/sections/contact.tsx` | — | Provider cards with call/copy + action buttons |
| ManagementLogin | `app/sections/management-login.tsx` | `onSuccess, onCancel` | PIN entry with shake animation |
| ManagementDashboard | `app/sections/management-dashboard.tsx` | `onLogout, onViewApplicants` | Overview widgets + applicants link |
| ApplicantsList | `app/sections/applicants-list.tsx` | `onSelect, onBack` | Applicant cards with status badges |
| ApplicantDetail | `app/sections/applicant-detail.tsx` | `applicantId, onBack` | Full profile: summary, application, screening, messages |
| Icon | `components/ui/icon.tsx` | `name, className` | Shared SVG icon renderer (29 icons) |

## Data Layer

| File | Exports | Purpose |
|------|---------|---------|
| `app/data/house-rules.ts` | `RuleCategory`, `houseRules`, `keyReminder` | House rules for welcome section |
| `app/data/utilities.ts` | `UtilityRow`, `utilityRows`, `utilityTotals`, `paymentInstructions`, `reminderNote` | Monthly utility costs and payment info |
| `app/data/contacts.ts` | `ContactProvider`, `ActionItem`, `providers`, `actionItems` | Utility provider contacts and quick actions |
| `app/data/applicant.ts` | `TownInfo`, `WatchtowerFacility`, `KingdomHall`, `AssemblyHall`, `PricingInfo`, `Testimonial`, `GalleryPhoto` | Content for applicant section |
| `app/data/applicants.ts` | `Applicant`, `Attachment`, `ApplicationDetails`, `ScreeningReport`, `applicants`, `journeySteps`, `getStatusLabel`, `getStatusColor` | Applicant pipeline with full screening data |
| `app/data/management.ts` | `MANAGEMENT_PIN`, `ManagementWidget`, `dashboardWidgets`, `managementDocuments` | Management portal config |

## Assets

| File | Purpose |
|------|---------|
| `public/hero-door.jpg` | Hero background image |
| `public/walkerfront.jpeg` | Property photo |
| `public/walkerkitchen.jpeg` | Property photo |
| `public/walkerdining.jpeg` | Property photo |
| `public/walkerbath.jpeg` | Property photo |
| `public/waldebfall.jpg` | Town photo |
| `public/waldensign.jpg` | Town photo |
| `public/Walden,_NY,_skyline_2.jpg` | Town photo |
| `public/Walden_Village_Hall.jpg` | Town photo |
| `public/wallkillbethel.jpg` | Watchtower facility |
| `public/patersonbethel.jpg` | Watchtower facility |
| `public/warwickbethel.webp` | Watchtower facility |

<!-- updated: 2026-06-14 -->
