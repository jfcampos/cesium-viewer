# Cesium + Vue Viewer

[![AI-DECLARATION: hint](https://img.shields.io/badge/䷼%20AI--DECLARATION-hint-ecfccb?labelColor=ecfccb)](https://ai-declaration.md)

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=vercel)](https://cesium-viewer-pi.vercel.app/)

A personal learning project that integrates [CesiumJS](https://cesium.com/platform/cesiumjs/) into a [Vue 3](https://vuejs.org/) application built with [Vite](https://vite.dev/).

**Live demo:** https://cesium-viewer-pi.vercel.app/

## Features

- 3D globe rendered with a Cesium `Viewer`
- Loads a 3D Tiles tileset from a configurable URL and zooms to it
- Click a feature in the tileset to show its properties in a side panel
- App bar controls to show/hide the tileset and adjust its maximum screen space error (level of detail)

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) + TypeScript
- [CesiumJS](https://cesium.com/platform/cesiumjs/) for the 3D globe
- [Vuetify](https://vuetifyjs.com/) for the UI layout and components, with [Roboto](https://fontsource.org/fonts/roboto) via Fontsource
- [Vite](https://vite.dev/) as dev server and bundler
- [Pinia](https://pinia.vuejs.org/) for shared viewer state, and [Vue Router](https://router.vuejs.org/)
- [Vitest](https://vitest.dev/) for unit tests, [Cypress](https://www.cypress.io/) for end-to-end tests
- [ESLint](https://eslint.org/), [Oxlint](https://oxc.rs/) and [Prettier](https://prettier.io/) for linting and formatting

## Prerequisites

- [Node.js](https://nodejs.org/) `^22.18.0` or `>=24.12.0`
- [pnpm](https://pnpm.io/)
- A [Cesium ion](https://ion.cesium.com/) account and access token (used for the default imagery)
- The URL of a 3D Tiles `tileset.json` to display

## Getting Started

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Create a `.env` file from the example and fill in the values:

   ```sh
   cp .env.example .env
   ```

   ```dotenv
   VITE_CESIUM_ION_ACCESS_TOKEN=<your-cesium-ion-token>
   VITE_CESIUM_TILESET_URL=<url-to-tileset.json>
   ```

   | Variable                       | Description                                |
   | ------------------------------ | ------------------------------------------ |
   | `VITE_CESIUM_ION_ACCESS_TOKEN` | Cesium ion access token                    |
   | `VITE_CESIUM_TILESET_URL`      | URL of the 3D Tiles `tileset.json` to load |

3. Start the development server:

   ```sh
   pnpm dev
   ```

## Scripts

| Command             | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `pnpm dev`          | Start the Vite dev server with hot reload                 |
| `pnpm build`        | Type-check and build for production                       |
| `pnpm preview`      | Serve the production build locally                        |
| `pnpm type-check`   | Run `vue-tsc` type checking                               |
| `pnpm test:unit`    | Run unit tests with Vitest                                |
| `pnpm test:e2e:dev` | Run Cypress end-to-end tests against the dev server       |
| `pnpm test:e2e`     | Run Cypress end-to-end tests against the production build |
| `pnpm lint`         | Lint and auto-fix with Oxlint and ESLint                  |
| `pnpm format`       | Format `src/` with Prettier                               |

## Testing

- **Unit tests** (Vitest, jsdom): there are no unit tests yet; `pnpm test:unit` passes when none are found. Note that jsdom has no WebGL, so components that create a Cesium `Viewer` can't be mounted as-is.
- **End-to-end tests** (Cypress): a smoke test in `cypress/e2e/app.cy.ts` checks that the app loads and renders the app bar. `pnpm test:e2e` runs against the production preview, so run `pnpm build` first.

## AI Disclosure

This is a personal project with the goal of learning both technologies. Most of the code was written manually; AI was used for documentation, tests and code review.

See [AI-DECLARATION.md](./AI-DECLARATION.md) for details on how AI tools were used in this repository.
