# ITZ FIZZ - Scroll-driven Hero

A dark, orange-toned hero section built with **React + Vite**, **GSAP** and **ScrollTrigger**.
The sports car drives across the road as you scroll, the headline lights up as the car passes each letter,
and the stat bars fill in turn. Reversing the scroll plays everything back.

## Features

- Intro timeline on load: label, letter stagger, stats, car, then scroll cue.
- Hero is pinned with ScrollTrigger (`pin`, `scrub`, `anticipatePin`) for 2.5 viewport heights.
- Car position, scale and rotation are all tied to scroll progress.
- Letters light up as the car passes them (positions re-measured on resize).
- Stat bars fill with scroll.
- Responsive: headline, car width, travel distance and stat cards all scale.
- `prefers-reduced-motion`: no pin, no animation, the finished state is shown.
- Works with touch scrolling on phones and tablets.
- The car is an inline SVG, so no external image is needed.

## Project structure

```
itz-fizz/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Page layout (header, hero, results, footer)
    ├── styles.css               # Tailwind theme + hero styles
    ├── components/
    │   ├── Header.jsx
    │   ├── Hero.jsx             # Headline, road + car, stats, scroll cue
    │   ├── CarSvg.jsx           # Top-view sports car drawn in SVG
    │   └── Footer.jsx
    └── hooks/
        └── useHeroAnimation.js  # All GSAP setup (intro + scroll scene)
```

## Getting started

Requires Node.js 18 or newer.

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build locally
```

## How the animation works

- **Intro** (`useHeroAnimation.js`): a single `gsap.timeline` using `from()` tweens. Content stays visible
  if JavaScript fails, because the default CSS state is visible.
- **Scroll scene**: one scrubbed timeline pinned to the hero. The car's `x` runs linearly from the left
  edge to the right edge, so the letters can be lit at the exact scroll position where the car passes them.
- **Separate elements for separate jobs**: the intro moves `.car-wrap`, the scroll moves `.car`,
  so the two never overwrite each other's transforms.
- **Cleanup**: everything is created inside `gsap.matchMedia()` and reverted in the effect cleanup,
  so StrictMode and remounts don't leave duplicate ScrollTriggers behind.

## Deploying

The output of `npm run build` is a static site in `dist/`.

### Option A: Vercel (recommended)

1. Push the project to GitHub (see below).
2. In Vercel, click **Add New > Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**.

### Option B: GitHub Pages

1. In `vite.config.js`, add `base: '/<your-repo-name>/'` inside `defineConfig`.
2. Run `npm run build`.
3. Publish the `dist/` folder, for example with the `gh-pages` package (`npx gh-pages -d dist`),
   or use a GitHub Actions workflow that uploads `dist/` as a Pages artifact.
4. In the repository settings, set **Pages > Source** to the branch that holds the output.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: ITZ FIZZ scroll hero"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Customising

- Stats live in the `STATS` array in `src/components/Hero.jsx`. The values are placeholders copied from the
  reference design; replace them with real figures.
- Colours are in the `@theme` block in `src/styles.css` (`--color-ember`, `--color-ink`, and so on).
- Pin length is `PIN_DISTANCE` in `src/hooks/useHeroAnimation.js`.
