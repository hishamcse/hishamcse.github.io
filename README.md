# hishamcse.github.io

> Personal portfolio website of **Syed Jarullah Hisham** — Software Development Engineer at IQVIA, MSc student at BUET, and BUET CSE graduate.

🔗 **Live:** https://hishamcse.github.io

---

## Overview

A fully redesigned, 3D-powered personal portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, zero dependencies to install. Every page features a unique live **Three.js** 3D background scene that responds to mouse movement.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero with 3D particle field + profile, stats, quick links |
| `/education` | Academic timeline from primary school to ongoing MSc at BUET |
| `/skills` | Languages, frameworks, databases, tools & IDEs |
| `/projects` | Featured projects + other GitHub repos |
| `/experience` | Work experience at IQVIA and ERA-Infotech |
| `/publication` | IEEE Transactions paper on 5G vulnerability detection |
| `/connect` | Email, GitHub, LinkedIn, Facebook, YouTube |
| `/cv/Syed_Jarullah_Hisham.pdf` | Downloadable CV |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom design system, no framework) |
| 3D Graphics | [Three.js r128](https://threejs.org/) via CDN |
| Typography | [Syne](https://fonts.google.com/specimen/Syne) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts |
| Hosting | GitHub Pages |

---

## 3D Scenes (per page)

Each page loads a unique Three.js scene via `bg3d.js`, driven by the `data-scene` attribute on the canvas element:

- **Home** — Particle field (1800 pts) + spinning icosahedron + dual animated torus rings
- **Education** — Dodecahedron + octahedron + orbital ring
- **Skills** — 7 floating wireframe cubes + icosahedron
- **Projects** — Dual nested tetrahedra rotating in opposite directions
- **Experience** — Torus knot + lattice sphere
- **Publication** — Gold-tinted octahedra + precision ring
- **Connect** — Orbiting sphere + concentric torus rings

All scenes parallax to mouse movement and are capped at 1.5× pixel ratio for performance.

---

## Project Structure

```
hishamcse.github.io/
├── index.html              # Home page
├── global.css              # Shared design system
├── common.js               # Nav, scroll reveal, cursor glow
├── bg3d.js                 # Three.js 3D background (all subpages)
├── education/
│   └── index.html
├── skills/
│   └── index.html
├── projects/
│   └── index.html
├── experience/
│   └── index.html
├── publication/
│   └── index.html
├── connect/
│   └── index.html
├── cv/
│   └── Syed_Jarullah_Hisham.pdf
└── images/
    └── ...
```

---

## Highlights

- **IEEE Publication** — *5GPT: 5G Vulnerability Detection* in IEEE Transactions on Information Forensics and Security (Q1, IF 8.0)
- **IQVIA** — SDE-1 working on backend systems and AI agents (.NET, Agentic AI, Python, LangGraph)
- **BUET** — B.Sc CSE (2019–2024), M.Sc ongoing (2024–)

---

## Local Development

No build step required. Just open any `.html` file directly in a browser, or serve locally:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

---

## Deployment

This repo is configured with **GitHub Pages** to auto-deploy on every push to `main`. No CI/CD setup needed.
