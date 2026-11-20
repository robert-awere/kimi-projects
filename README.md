# kimi-projects

A repository for Kimi-based projects: apps, websites, builds, and ideas.

## Lumos — Visual Reading Library

A cinematic, responsive reading interface for the seven Harry Potter books. Selecting a book opens three original visual lessons: a four-stage story arc, a character relationship map, and a theme comparison with a discussion prompt.

### Run

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

### Structure

- `src/App.tsx` — library, search, saved shelf, dialogs, and browser-local state
- `src/components/LearningGuide.tsx` — the three interactive lesson types
- `src/data/books.ts` — original analysis and diagram data for all seven books
- `src/index.css` — responsive visual system and reduced-motion support
- `public/covers/` — low-resolution cover artwork used for identification

Saved books and completed lessons use `localStorage`; they remain in the current browser and do not sync across devices. The app includes an installable PWA manifest and a service worker with network-first navigation.

See `CREDITS.md` for artwork, font, and icon credits.
