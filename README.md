# BugBiceps — Engineering Digital Systems That Scale

> **BugBiceps** is an elite digital engineering agency delivering high-performance Web Platforms, Mobile Applications, AI Systems, Workflow Automation, SEO/GEO Optimization, and 3D Visualizations.

**We Flex Code Until Bugs Break.**

This repository contains the source for the BugBiceps agency website — a single-page React application with anchor navigation across Services, Work, Process, and Contact.

For full agency documentation, service breakdowns, and the case-study index, see [info.md](./info.md).

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Tech Stack

- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4 (custom "Ember on Charcoal" dark design system)
- **Animation**: Framer Motion (scroll reveals, `prefers-reduced-motion` aware)
- **Icons**: lucide-react
- **Type**: Sora (display), Inter (body), JetBrains Mono (technical labels)

## Project Structure

```
public/            Static assets — logo, hero art, service showreels (mp4)
src/
  components/      Navbar, Hero, Services, Work, Process, CTABand, Contact, Footer
  data/            site.js, services.js, projects.js, process.js
  App.jsx          Page composition
  index.css        Tailwind layers + design-system component classes
tailwind.config.js Design tokens (colors, type scale, shadows, keyframes)
```

Content is data-driven — edit the arrays in `src/data/` to change services, case studies, process steps, or contact details without touching component code.

---

© 2026 BugBiceps. All Rights Reserved. · [bugbiceps.in](https://bugbiceps.in)
