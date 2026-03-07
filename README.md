# BugBiceps

A modern, high-performance web application built with React and Vite. Features smooth animations, custom cursor interactions, and an engaging user experience.

## Features

- ⚡ **Fast Build Tool**: Powered by Vite for lightning-fast development and optimized production builds
- 🎨 **Smooth Animations**: GSAP-driven animations with ScrollTrigger for scroll-based effects
- ✨ **Custom Interactions**: Magnetic buttons, custom cursor, and scroll progress indicators
- 📱 **Responsive Design**: Mobile-friendly layout with smooth scrolling via Lenis
- 🎯 **Component-Based**: Modular architecture with reusable React components

## Tech Stack

- **React** 18.3.1 - UI library
- **Vite** 6.0.5 - Build tool and dev server
- **GSAP** 3.12.5 - Animation library with ScrollTrigger
- **Lenis** 1.1.18 - Smooth scrolling library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd BugBiceps

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── CustomCursor.jsx
│   ├── MagneticButton.jsx
│   ├── Navbar.jsx
│   ├── Preloader.jsx
│   └── ScrollProgress.jsx
├── sections/            # Page sections
│   ├── AIShowcase.jsx
│   ├── CaseStudies.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Philosophy.jsx
│   ├── Services.jsx
│   └── Stats.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Key Components

- **Preloader**: Initial loading animation
- **CustomCursor**: Enhanced cursor with interactive effects
- **MagneticButton**: Buttons with magnetic hover effects
- **Navbar**: Sticky navigation bar
- **ScrollProgress**: Visual scroll position indicator

## License

All rights reserved.

## Author

BugBiceps Team

## Code Improvements Summary

- **Regression Tests Added**
  - Implemented regression tests for high-risk components to ensure stability:
    - `src/components/MagneticButton.jsx`
    - `src/components/CustomCursor.jsx`
    - `src/components/Navbar.jsx`

- **Code Refactoring**
  - Initiated extraction of shared utility code into a dedicated module to reduce code coupling and improve maintainability.

- **Documentation Updates**
  - Re-indexed and regenerated walkthroughs and diagrams following structural changes to maintain up-to-date documentation.
