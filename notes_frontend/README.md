# Ocean Notes (React)

A modern, responsive notes app UI (frontend-only) following the Ocean Professional theme.

## Quick Start

- npm install
- npm start
- Open http://localhost:3000

TypeScript is enabled for components and context files; the app boots via CRA using a JS entry that renders the TSX App component.

Notes are persisted locally to your browser via localStorage and survive page reloads.

## Features

- CRUD: Create, Read, Update, Delete notes
- Search notes by title/content
- Sort by last updated (desc)
- Confirmation before delete
- Local persistence (localStorage)
- Responsive, accessible UI
- Keyboard: Ctrl/Cmd + N to create a new note

## Structure

- src/styles/theme.css: Theme variables
- src/styles/global.css: Global styles, layout, components
- src/lib/storage.ts: LocalStorage helpers and Note type
- src/context/NotesContext.tsx: Context with CRUD logic + toasts
- src/components/*: NavBar, NoteList, NoteItem, NoteEditor, EmptyState, UI primitives
- src/App.tsx: App shell with provider
- src/index.tsx: Entry point

## Theming

Ocean Professional palette:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Adjust variables in:
- src/styles/global.css
- src/styles/theme.css

## Logo/Favicon

The app uses the provided image for the navbar logo and favicon (public/favicon.ico). If you replace the logo, keep the file path `/assets/logo.png` for the navbar and update the favicon if needed.

## Accessibility

- Focus-visible styles
- Labeled inputs
- Keyboard navigable list items
- aria-live toasts

## Notes

This is a frontend-only demo; no backend exists. Data is stored locally.
