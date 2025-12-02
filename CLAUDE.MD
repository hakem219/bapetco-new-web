# Project Overview

This is a React application built with TypeScript and Vite, featuring 3D graphics capabilities and internationalization support.

## Tech Stack

### Core
- **React 19.2.0** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework

### 3D Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Animations
- **GSAP 3.13.0** - Professional-grade animation library
- **@gsap/react** - GSAP React integration

### Internationalization (i18n)
- **i18next** - Internationalization framework
- **react-i18next** - React integration for i18next
- **i18next-browser-languagedetector** - Automatic language detection
- **i18next-http-backend** - Backend loading for translations

### Fonts
- **IBM Plex Sans Arabic** - Arabic script support
- **Inter** - Modern sans-serif font
- **Montserrat** - Geometric sans-serif
- **Tajawal** - Arabic font

## Project Structure

```
new/
├── public/           # Static assets
├── src/             # Source code
├── .vscode/         # VS Code configuration
├── node_modules/    # Dependencies
├── index.html       # HTML entry point
├── package.json     # Dependencies and scripts
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration (base)
├── tsconfig.app.json    # TypeScript configuration (app)
├── tsconfig.node.json   # TypeScript configuration (node)
├── eslint.config.js     # ESLint configuration
└── .gitignore       # Git ignore rules
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Key Features

### 3D Graphics Support
The project includes Three.js integration through React Three Fiber, enabling:
- 3D scene rendering
- WebGL-based graphics
- Interactive 3D components
- Pre-built 3D helpers via @react-three/drei

### Animation Capabilities
GSAP provides professional animations:
- Timeline-based animations
- Smooth transitions
- Complex animation sequences
- React hooks for animations

### Multi-language Support
Full i18n setup with:
- Automatic language detection
- HTTP-based translation loading
- Support for Arabic and other languages
- Multiple Arabic-optimized fonts

### Modern Development
- Fast HMR (Hot Module Replacement) with Vite
- Type-safe development with TypeScript
- Code quality enforcement with ESLint
- Modern React 19 features

## Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow ESLint rules (run `npm run lint`)
- Use functional components with hooks
- Leverage Tailwind CSS for styling

### 3D Components
- Place 3D components in appropriate directories
- Use React Three Fiber's declarative API
- Leverage @react-three/drei helpers when possible
- Keep performance in mind for 3D scenes

### Internationalization
- Keep translation keys organized
- Support RTL (Right-to-Left) for Arabic
- Test all UI with different languages
- Use appropriate fonts for each language

### Performance
- Optimize 3D scenes (limit polygons, textures)
- Use GSAP efficiently (avoid excessive animations)
- Lazy load components when appropriate
- Monitor bundle size

## Build Configuration

### TypeScript
Three TypeScript configurations:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application code
- `tsconfig.node.json` - Node/build scripts

### Vite
- Fast development server
- Optimized production builds
- React plugin with Fast Refresh
- Tailwind CSS integration via Vite plugin

## Dependencies Management

### Production Dependencies
All runtime dependencies needed for the application to work.

### Dev Dependencies
Build tools, type definitions, and linting tools used during development only.

## Notes for AI Assistants

When working on this project:

1. **3D Development**: Use React Three Fiber's declarative syntax. Import components from @react-three/fiber and helpers from @react-three/drei.

2. **Animations**: Use GSAP with React hooks from @gsap/react for component animations.

3. **Styling**: Prefer Tailwind CSS utility classes over custom CSS. Check Tailwind v4 documentation for latest features.

4. **i18n**: Use react-i18next hooks (useTranslation) for translations. Support both LTR and RTL layouts.

5. **Type Safety**: Always use TypeScript. Add proper type definitions for props, state, and functions.

6. **Build**: Run `npm run build` to ensure TypeScript compilation and Vite build both succeed.

7. **Arabic Support**: Remember RTL layout considerations and use appropriate Arabic fonts (IBM Plex Sans Arabic or Tajawal).

8. **Modern React**: This uses React 19, so leverage latest features while avoiding deprecated patterns.
