# Satisfactory Planner

A browser-based production planner for the factory game [Satisfactory](https://www.satisfactorygame.com/). Pick the items you want to produce and how many per minute, and the app builds an interactive, colour-coded dependency graph that shows every intermediate recipe, the required input rates, and whether each step is over- or under-supplied.

<img width="3416" height="1274" alt="Satisfactory Planner showing a production network graph with the production input side panel" src="https://github.com/user-attachments/assets/81f83603-919b-463d-a3e6-f59018a633b6" />

## Features

- **Production graph** – add items and target rates and the planner renders a directed graph (Cytoscape.js) with one node per item. Each node shows its input and output rate per minute, and the output rate turns green or red depending on whether upstream production covers demand.
- **Byproducts** – recipes that yield a secondary output (e.g. Plastic → Heavy Oil Residue) draw dashed byproduct edges and credit that output toward the item's supply.
- **Base and alternate recipes** – all 195 recipes in the game data (108 base, 87 alternate) can be toggled on or off from the *Recipes* tab, so the graph reflects the alternates you have actually unlocked.
- **Multiple production tabs** – split a factory into named tabs (e.g. "Steel", "Motors"). Any node can be marked as *exported* to another tab, and the surplus from the source tab is fed into the target tab's demand automatically.
- **Layout controls** – rank direction, node/edge/rank separation, alignment, ranker algorithm, spacing factor, and edge curve style are all adjustable live from the *Options* tab, with defaults shown next to every control.
- **Persistent state** – tabs, node positions, pan/zoom, layout settings, and recipe selections are saved to `localStorage`, so a refresh brings the plan back exactly as you left it.
- **Import / export** – download the whole plan as a JSON file for backup or sharing, and load it back later from the *Settings* tab.

## How it works

Game data lives in a single JSON file (`src/Client/Planner/Data/Items.json`) validated by a JSON Schema. Each entry describes a recipe's output rate, its inputs, optional byproducts, and whether it is an alternate recipe.

When the user changes a target rate, a Pinia store recomputes every item's **input rate** (what is being produced, including byproducts and imports from other tabs) and **output rate** (what downstream recipes consume). The node and edge lists are derived from that state and pushed into a Cytoscape instance, which lays them out with the Dagre layout plugin and renders the nodes as HTML so item icons and rate badges can be styled with regular CSS.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Vue 3 (Composition API, `<script setup>`), TypeScript |
| UI | Vuetify 3, Material Design Icons |
| State | Pinia + VueUse `useStorage` for `localStorage` sync |
| Graph | Cytoscape.js with `cytoscape-dagre`, `cytoscape-klay`, `cytoscape-dom-node` |
| Build | Vite 5, SASS |
| Quality | ESLint + Prettier (enforced at build time via `vite-plugin-eslint`) |
| Release | semantic-release with conventional commits, auto-generated `CHANGELOG.md` |
| CI/CD | GitHub Actions – release on push to `main`, then build and deploy over FTP |

## Getting started

Requires Node.js 18 or newer.

```bash
git clone https://github.com/marioalvarez32/satisfactory-planner.git
cd satisfactory-planner
npm install
npm run dev
```

Then open the URL that Vite prints (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # eslint --fix over .ts and .vue files
```

## Project structure

```
src/
├── App.vue                         # App shell (navigation bar + planner)
└── Client/
    ├── NavigationBar.vue           # Top bar showing the current app version
    ├── Components/Sidepanel/       # Reusable expansion-panel building blocks
    └── Planner/
        ├── ProductionPlanner.vue   # Page layout: tabs, side panel, overview
        ├── Components/             # Production list, node/layout options, recipe tables
        ├── Composables/            # useVisualNetwork – Cytoscape lifecycle and events
        ├── Stores/                 # Pinia stores: production lists, network data, options, recipes
        ├── Models/                 # TypeScript classes for items, lists, layout/style options
        ├── Utilities/              # Rate calculations, item lookups, localStorage sync
        ├── Services/               # JSON import/export
        ├── Data/                   # Items.json (recipes) and item colour groups
        └── Schemas/                # JSON Schema for Items.json
```

## Releases and deployment

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) format. On every push to `main`, the *Release* workflow runs semantic-release, which:

1. Determines the next version from the commit messages.
2. Updates `CHANGELOG.md`, `package.json`, and `public/internalVersion.json` (the version shown in the app header).
3. Tags the release and publishes GitHub release notes.

A second workflow then builds the site and mirrors `dist/` to the hosting server over FTP.

## Roadmap

- Show buildings and building counts per recipe.
- Show power consumption and raw resource totals for a plan.
- Support overclocking and clock-speed based rate adjustments.
- Add unit tests for the rate calculations.
