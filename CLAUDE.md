# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a German-language HTML table learning platform built with Next.js 15 for 17-year-old students. The application provides a 2-hour learning session with theory, examples, and interactive exercises for mastering HTML tables.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Core Components
- **Tabbed Navigation**: Four main sections (Introduction, Theory, Examples, Exercises) with progress tracking
- **HTML Editor**: Monaco Editor-based code editor with real-time HTML validation and table-specific features
- **HTML Preview**: Safe HTML rendering using html-react-parser with sanitization
- **Gamification System**: Points, levels, achievements, and progress tracking

### Key Files
- `app/page.tsx` - Main application layout with tab navigation
- `app/exercises-data.ts` - Exercise definitions with validation logic using Cheerio
- `components/HtmlEditor.tsx` - Monaco Editor with HTML table validation
- `components/HtmlPreview.tsx` - Safe HTML preview component
- `components/ExercisesSection.tsx` - Main exercises interface with gamification
- `lib/theme-context.tsx` - Theme management (light/dark/high-contrast)

### Exercise System
- 4 progressive exercises: basic tables → colspan → rowspan → complex tables
- Validation uses Cheerio for HTML parsing and structure checking
- Progress persistence via localStorage
- Real-time code validation with user-friendly error messages

### Gamification Features
- User profiles with levels and points
- Achievement system with unlockable badges
- Progress tracking with circular progress indicators
- Score calculation based on attempts, time, and hints used

### UI/UX Considerations
- German language interface
- Responsive design for mobile and desktop
- Accessibility-first approach with proper ARIA labels
- Theme support (light/dark/high-contrast)
- Motion animations using Framer Motion

### Technical Dependencies
- Next.js 15 with App Router
- Monaco Editor for code editing
- Cheerio for HTML parsing and validation
- html-react-parser for safe HTML rendering
- Tailwind CSS with custom design system
- Radix UI components via shadcn/ui
- Framer Motion for animations

### Data Persistence
- User progress in localStorage
- Game state with scores and achievements
- Theme preferences
- Exercise completion history