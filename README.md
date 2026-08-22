# Lâle — Turkish word garden

A Turkish vocabulary flashcard app with spaced repetition, category browsing,
built-in translations, emoji "pictures," and text-to-speech pronunciation.

## Run it

Requires [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

This produces a `dist/` folder of static files you can host anywhere
(Netlify, Vercel, GitHub Pages, your own server, etc.). Preview the build
locally with:

```bash
npm run preview
```

## Notes

- **Storage**: your words and streak are saved in the browser's
  `localStorage`, scoped to whatever domain/port you run this on. Clearing
  browser data for that site will clear your progress.
- **Pronunciation**: uses the browser's built-in text-to-speech
  (`speechSynthesis`) with a Turkish voice if your OS/browser has one
  installed. No API key or network call needed.
- **Translation lookups**: the Add Word screen first checks a small
  built-in Turkish↔English dictionary (instant, offline). For words outside
  that list, it also tries a free online API
  ([MyMemory](https://mymemory.translated.net/)) as a bonus — this requires
  an internet connection and may occasionally be rate-limited.
