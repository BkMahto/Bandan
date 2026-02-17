# Bandan Kumar Mahto — iOS Developer Portfolio

A modern, responsive portfolio web application showcasing iOS development expertise, professional experience, education, and projects. Built with **Next.js 16**, **React 19**, **Tailwind CSS**, **Framer Motion**, and **Firebase**.

**Live URL**: [bandan-kumar.vercel.app](https://bandan-kumar.vercel.app)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Page Sections](#page-sections)
     - [Hero Section](#hero-section)
     - [Skills Section](#skills-section)
     - [Timeline Section](#timeline-section)
     - [Development Process](#development-process)
     - [App Showcase](#app-showcase)
     - [Contact Section](#contact-section)
- [Shared Components](#shared-components)
     - [NavBar](#navbar)
     - [AnalyticsTracker](#analyticstracker)
- [Services & Utilities](#services--utilities)
     - [Firebase Configuration](#firebase-configuration)
     - [Profile Service](#profile-service)
     - [Analytics](#analytics)
- [Styling & Animations](#styling--animations)
- [SEO](#seo)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Tech Stack

| Technology    | Version | Purpose                                      |
| ------------- | ------- | -------------------------------------------- |
| Next.js       | 16.1.x  | React framework (App Router, SSR, Turbopack) |
| React         | 19.x    | UI library                                   |
| TypeScript    | 5.x     | Type safety                                  |
| Tailwind CSS  | 3.4.x   | Utility-first styling                        |
| Framer Motion | 12.x    | Animations (modals, transitions)             |
| Firebase      | 12.8.x  | Analytics, Firestore, Realtime Database      |

---

## Project Structure

```
app/
├── page.tsx                    # Root page — composes all sections
├── layout.tsx                  # Root layout — metadata, fonts, structured data, NavBar
├── globals.css                 # Global styles, custom animations (shimmer, expand)
├── robots.ts                   # SEO — robots.txt generation
├── sitemap.ts                  # SEO — sitemap.xml generation
│
├── components/
│   ├── NavBar.tsx              # Fixed navigation bar (desktop + mobile)
│   ├── AnalyticsTracker.tsx    # Client-side visitor tracking component
│   ├── ContactSection.tsx      # Contact CTA + social links + resume button
│   ├── ContactDialog.tsx       # "Get in Touch" modal (mail/Gmail chooser)
│   ├── ResumeModal.tsx         # PDF resume preview modal
│   ├── DevelopmentProcess.tsx  # iOS development workflow cards
│   ├── AppShowcase.tsx         # Project showcase (currently commented out)
│   │
│   ├── hero/
│   │   ├── index.tsx           # Hero section — intro, title, tagline
│   │   └── HeroStats.tsx       # Stat cards (apps published, rating, etc.)
│   │
│   ├── skills/
│   │   ├── index.tsx           # Skills section — categorized grid
│   │   ├── SkillCard.tsx       # Individual skill card (clickable)
│   │   ├── SkillModal.tsx      # Skill detail modal (description, links)
│   │   └── constants.tsx       # Category styles & icons mapping
│   │
│   └── timeline/
│       ├── index.tsx           # Timeline section — experience & education columns
│       ├── TimelineItem.tsx    # Clickable timeline entry card
│       ├── TimelineModal.tsx   # Detail modal for timeline entries
│       └── data.ts             # Static experience & education data
│
└── lib/
    ├── firebase.ts             # Firebase app init (singleton), exports db/rtdb/analytics
    ├── analytics.ts            # Event tracking (Firebase Analytics + RTDB)
    └── services/
        └── profile.ts          # Firestore profile data fetching service
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ layout.tsx (Server Component)                                   │
│  ├── Metadata & Fonts (Geist Sans/Mono)                        │
│  ├── Structured Data (JSON-LD: Person + WebSite)               │
│  ├── <AnalyticsTracker />  (Client — visitor logging)          │
│  └── <NavBar />            (Client — sticky nav)               │
├─────────────────────────────────────────────────────────────────┤
│ page.tsx (Server Component — fetches profile from Firestore)   │
│  ├── <HeroSection />       (Client — hero stats from Firestore)│
│  ├── <SkillsSection />     (Client — skills from Firestore)    │
│  ├── <TimelineSection />   (Client — static data)              │
│  ├── <DevelopmentProcess />(Client — static process cards)     │
│  └── <ContactSection />    (Client — contact CTA + resume)     │
└─────────────────────────────────────────────────────────────────┘
```

**Data flow**:

- `page.tsx` (server) calls `getProfileDetails()` → Firestore → passes data as props.
- Client components receive `initialData` via props (SSR hydration).
- `SkillsSection` has a client-side fallback that re-fetches from Firestore if `initialSkills` is absent.
- `TimelineSection` uses static data from `timeline/data.ts`.

---

## Page Sections

### Hero Section

**Files**: `hero/index.tsx`, `hero/HeroStats.tsx`

| Component     | Description                                                                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HeroSection` | Displays name, title ("iOS Developer"), tagline, and radial gradient backgrounds.                                                                                                                     |
| `HeroStats`   | Grid of 4 stat cards: Apps Published, Projects Worked On, App Rating, Years of Experience. Values fetched from Firestore (`HeroSectionData`). Shows a shimmer loading skeleton while data is loading. |

**Props**:

- `initialData?: HeroSectionData | null` — SSR-hydrated stats. Falls back to placeholder values if null.

---

### Skills Section

**Files**: `skills/index.tsx`, `skills/SkillCard.tsx`, `skills/SkillModal.tsx`, `skills/constants.tsx`

| Component       | Description                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `SkillsSection` | Main section. Fetches skills from Firestore (with SSR fallback). Groups by category.                                  |
| `SkillCard`     | Clickable card showing skill name, tag, and expertise level.                                                          |
| `SkillModal`    | Modal overlay triggered on skill click. Shows description, Google Search link, optional docs link. Locks body scroll. |

**Category styles** are defined in `constants.tsx`:

- **Core Stack** — blue accent
- **Frameworks & Services** — purple accent
- **Tools & Distribution** — indigo accent

**Data**: `Skill` interface from `profile.ts`:

```typescript
interface Skill {
	name: string;
	tag: string;
	expertise: string;
	category: "core" | "frameworks" | "tools";
	description: string;
	docUrl?: string;
	searchSuffix?: string;
}
```

---

### Timeline Section

**Files**: `timeline/index.tsx`, `timeline/TimelineItem.tsx`, `timeline/TimelineModal.tsx`, `timeline/data.ts`

| Component         | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| `TimelineSection` | Two-column layout (experience + education). Manages selected entry state for modal. |
| `TimelineItem`    | Clickable preview card with title, org, date, location, and first description line. |
| `TimelineModal`   | Detail modal showing all description bullet points with staggered animations.       |

**Data**: Static arrays `EXPERIENCE_DATA` and `EDUCATION_DATA` in `data.ts`.

```typescript
interface TimelineEntry {
	id: string;
	title: string;
	organization: string;
	location: string;
	dateRange: string;
	description: string[];
}
```

**Accent colors**: Blue for experience, purple for education.

---

### Development Process

**File**: `DevelopmentProcess.tsx`

Three process cards displayed in a responsive grid:

1. **Planning & Design** — blue
2. **Development & Testing** — purple
3. **Deployment & Maintenance** — green

Each card has a title, icon, and numbered step list. Uses hover glow effects.

---

### App Showcase

**File**: `AppShowcase.tsx`

> **Note**: Currently **commented out** in `page.tsx`.

Displays projects categorized as:

- **Architectural Highlights** (major projects)
- **Legacy Evolution** (maintenance projects)
- **Creative Lab** (personal projects)

Each project card shows title, status badge, subtitle, description, tech tags, and key contributions. Personal projects have a detail modal.

---

### Contact Section

**Files**: `ContactSection.tsx`, `ContactDialog.tsx`, `ResumeModal.tsx`

| Component        | Description                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ContactSection` | CTA section with heading, location, "Get in Touch" button, "View Resume" button, and GitHub/LinkedIn social links.     |
| `ContactDialog`  | Modal offering two email options: Default Mail App (`mailto:`) and Gmail (web compose). Tracks clicks via analytics.   |
| `ResumeModal`    | Full-screen PDF viewer modal using `<object>` embed. Mobile fallback with download button. Detects PDF viewer support. |

---

## Shared Components

### NavBar

**File**: `NavBar.tsx`

- **Fixed** at top with backdrop blur and transparency.
- **Nav items**: Home (`#home`), Expertise (`#skills`), Experience (`#experience`), Contact (`#contact`).
- **Active section tracking**: Scroll-based detection using `getBoundingClientRect()`.
- **Mobile menu**: Hamburger toggle with `AnimatePresence` slide animation.
- Tracks nav clicks via `trackEvent('nav_click', { section })`.

### AnalyticsTracker

**File**: `AnalyticsTracker.tsx`

A headless client component (`returns null`) that runs on mount to:

1. Initialize Firebase Analytics.
2. Resolve visitor identity via IP → `ip_to_visitor/` RTDB mapping.
3. Generate/persist a `visitor_id` in `localStorage`.
4. Log visitor metadata (IP, location, browser, screen size) to RTDB under `visitors/{id}/info`.
5. Append each page visit to `visitors/{id}/visits`.
6. Uses `sessionStorage` to avoid duplicate API calls per tab session.

---

## Services & Utilities

### Firebase Configuration

**File**: `lib/firebase.ts`

- Initializes Firebase App using singleton pattern (`getApps().length`).
- Exports:
     - `app` — Firebase App instance
     - `db` — Firestore instance
     - `rtdb` — Realtime Database instance
     - `initAnalytics()` — Lazily initializes Analytics (browser-only, checks `isSupported()`)
     - `logEvent` — Re-exported from Firebase Analytics

### Profile Service

**File**: `lib/services/profile.ts`

- **`getProfileDetails()`** — Fetches `ProfileDetails/MyDetail` document from Firestore.
- Returns `ProfileData` containing `heroSection` and `skillsSection`.
- Falls back to default values if document is missing.
- Exported interfaces: `HeroSectionData`, `Skill`, `ProfileData`.

### Analytics

**File**: `lib/analytics.ts`

- **`trackEvent(eventName, params)`** — Dual-logging to Firebase Analytics + Realtime Database.
- Generates a persistent `visitor_id` via `localStorage`.
- Events are stored at `visitors/{visitor_id}/events/{timestamp}` in RTDB.

---

## Styling & Animations

### Tailwind CSS

- Dark theme throughout with `bg-gray-900`, `bg-gray-800` variants.
- Glassmorphism effects via `backdrop-blur-sm`, `bg-gray-800/40`.
- Gradient text using `bg-gradient-to-r` + `bg-clip-text text-transparent`.

### Custom CSS Animations (`globals.css`)

| Animation         | Description                                     |
| ----------------- | ----------------------------------------------- |
| `animate-shimmer` | Loading skeleton glow effect (linear gradient)  |
| `animate-expand`  | Horizontal scale-in (used for decorative lines) |

### Framer Motion Patterns

- **Modals**: Scale + opacity + Y-offset transitions with `AnimatePresence` for enter/exit.
- **Body scroll lock**: `useEffect` sets `document.body.style.overflow = 'hidden'` in modals.
- **Staggered lists**: Timeline modal description points animate with delay per index.
- **NavBar mobile menu**: Height + opacity animation.

---

## SEO

### Metadata (`layout.tsx`)

- Title, description, keywords targeting "Bandan Kumar Mahto iOS Developer".
- Open Graph tags with image, site name, and URL.
- Favicons with light/dark mode variants.
- Web app manifest at `/manifest.json`.

### Structured Data (JSON-LD)

Two schemas injected in `layout.tsx`:

- **Person** — Name, URL, job title, social links.
- **WebSite** — Name, alternate names, URL.

### Dynamic Files

- `robots.ts` — Generates `robots.txt` allowing all crawlers, pointing to sitemap.
- `sitemap.ts` — Generates `sitemap.xml` with the root URL (monthly updates, priority 1).

---

## Getting Started

### Prerequisites

- Node.js **18+**
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd Bandan

# Install dependencies
npm install
```

### Environment

Firebase config is embedded in `lib/firebase.ts`. For a different Firebase project, replace the `firebaseConfig` object.

---

## Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start dev server with Turbopack |
| `npm run build` | Create production build         |
| `npm run start` | Serve production build          |
| `npm run lint`  | Run ESLint                      |

---

## Deployment

Deployed on **Vercel**. Push to main triggers automatic deployment.

- **URL**: [bandan-kumar.vercel.app](https://bandan-kumar.vercel.app)
- **Framework**: Auto-detected as Next.js by Vercel.

---

## Contact

- **Email**: [bandan.kmahto@gmail.com](mailto:bandan.kmahto@gmail.com)
- **LinkedIn**: [Bandan Kumar Mahto](http://www.linkedin.com/in/bandan-kumar)
- **GitHub**: [Bandan-K](https://github.com/Bandan-K/Bandan-K)

---

_Designed and developed by Bandan Kumar Mahto._
