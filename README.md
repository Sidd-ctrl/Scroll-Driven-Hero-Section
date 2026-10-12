# ITZ FIZZ — Scroll-Driven Hero

A dark, orange-toned animated hero section built with **React, Vite, GSAP, and ScrollTrigger**.

The sports car drives across the road as you scroll, the headline lights up as the car passes each letter, and the stat bars fill progressively. Scrolling backward reverses the animation for a smooth, interactive experience.

## Features

- **Animated intro:** Label, staggered headline, stats, car, and scroll cue animate on page load.
- **Scroll-driven animation:** Hero section stays pinned using GSAP ScrollTrigger for 2.5 viewport heights.
- **Dynamic car movement:** Position, scale, and rotation are controlled by scroll progress.
- **Interactive typography:** Headline letters light up as the car passes them, with positions recalculated on resize.
- **Animated statistics:** Stat bars fill progressively as the user scrolls.
- **Responsive design:** Headline, car dimensions, travel distance, and stat cards adapt to different screen sizes.
- **Reduced-motion support:** Respects `prefers-reduced-motion` and displays the finished state without scroll animations.
- **Touch support:** Designed to work with touch scrolling on phones and tablets.
- **Inline SVG car:** The sports car is rendered directly in SVG without requiring an external image.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- CSS and SVG

## Project Structure

```text
itz-fizz/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Header.jsx
    │   ├── Hero.jsx
    │   ├── CarSvg.jsx
    │   └── Footer.jsx
    └── hooks/
        └── useHeroAnimation.js
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- Git (optional, for version control)

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd itz-fizz
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are stored in the `dist/` directory.

## How the Animation Works

### Intro Timeline

The `useHeroAnimation.js` hook creates a GSAP timeline that animates the hero content when the page loads. Elements use `from()` tweens, while the default CSS keeps content visible if JavaScript fails.

### Scroll-Driven Scene

GSAP ScrollTrigger pins the hero section and connects animation progress to scrolling. The car moves linearly from the left edge to the right edge, allowing individual headline letters to illuminate at the appropriate scroll positions.

### Independent Transforms

The `.car-wrap` element handles the intro animation, while `.car` handles scroll-driven movement. Keeping these transforms separate prevents the animations from overwriting each other.

### Responsive Behavior and Cleanup

Animations are configured using `gsap.matchMedia()` to support responsive layouts and reduced-motion preferences. The effect cleanup reverts the animations and ScrollTriggers to prevent duplicate instances during React StrictMode remounts.

## Deployment on Netlify

The project is deployed as a static website using **Netlify**.

### Option 1: Deploy Through GitHub

1. Push the project to a GitHub repository.
2. Log in to [Netlify](https://www.netlify.com/).
3. Select **Add new project → Import an existing project**.
4. Connect GitHub and select your repository.
5. Configure the build settings:

   | Setting | Value |
   |---|---|
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Base directory | Leave blank for the project root |

6. Select **Deploy site**.

Netlify will build the project and provide a public URL. Subsequent pushes to the connected GitHub branch can trigger automatic deployments.

### Option 2: Deploy Using Netlify CLI

Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

Log in to your Netlify account:

```bash
netlify login
```

Build the project:

```bash
npm run build
```

Deploy the production build:

```bash
netlify deploy --prod --dir=dist
```

If the site has not been linked to a Netlify project yet, run `netlify init` first and follow the prompts.

## Customization

- **Statistics:** Update the `STATS` array in `src/components/Hero.jsx` with your preferred labels and values.
- **Colors:** Modify the theme variables in the `@theme` block of `src/styles.css`, including `--color-ember` and `--color-ink`.
- **Scroll duration:** Adjust `PIN_DISTANCE` in `src/hooks/useHeroAnimation.js` to change how long the pinned animation lasts.
- **Car animation:** Modify the GSAP properties controlling the car's position, scale, and rotation in `src/hooks/useHeroAnimation.js`.
- **Typography and layout:** Customize the hero headline, spacing, responsive styles, and component layout in the relevant source files.

## Deployment

**Platform:** Netlify  
**Build command:** `npm run build`  
**Publish directory:** `dist/`

The project uses Vite's static production build and does not require a separate backend server.

---

Built with React, GSAP, and a little motion.
