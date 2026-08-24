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
- **Install a Turkish voice**:
  - **Windows 10/11**: Go to **Settings → Time & Language → Language & region
    → Add a language**, search for **Türkçe (Turkish)**, and install it. Make
    sure to select **Speech** under the optional features so the TTS voice pack
    downloads, not just the keyboard or display language.
  - **macOS**: Go to **System Settings → Accessibility → Spoken Content →
    System Voice → Manage Voices/Customize**, find a Turkish voice such as
    **Yelda**, and download it. Chrome, Safari, and Edge will pick it up
    automatically.
  - **iPhone/iPad (iOS)**: Go to **Settings → Accessibility → Spoken Content
    → Voices**, find Turkish in the language list, and download a voice.
    Safari and other browsers on iOS will then have it available.
  - **Android**: Go to **Settings → System** (or **General management**) →
    **Languages & input → Text-to-speech output**, tap the gear next to your
    engine (usually Google), choose **Install voice data**, then select and
    download Turkish.
- **Translation lookups**: the Add Word screen first checks a small
  built-in Turkish↔English dictionary (instant, offline). For words outside
  that list, it also tries a free online API
  ([MyMemory](https://mymemory.translated.net/)) as a bonus — this requires
  an internet connection and may occasionally be rate-limited.

## Project structure

The app is organized by responsibility:

  Review, Add Word, and Library screens.
  tulip mastery glyph, pronunciation button, empty state, and form field.
  metadata.
  MyMemory fallback.
  IDs, and deck shuffling.
  helpers.

The next natural UI split, as the app grows, is to move the screen components
from `App.tsx` into `src/components/screens/` and move the embedded catalog
into `src/data/vocabulary.ts`.
  IDs, and deck shuffling.
