# Cesium + Vue Viewer

A personal learning project that integrates [CesiumJS](https://cesium.com/platform/cesiumjs/) into a [Vue 3](https://vuejs.org/) application built with [Vite](https://vite.dev/).

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) + TypeScript
- [CesiumJS](https://cesium.com/platform/cesiumjs/) for the 3D globe
- [Vite](https://vite.dev/) as dev server and bundler
- [Pinia](https://pinia.vuejs.org/) and [Vue Router](https://router.vuejs.org/)
- [Vitest](https://vitest.dev/) for unit tests, [Cypress](https://www.cypress.io/) for end-to-end tests
- [ESLint](https://eslint.org/), [Oxlint](https://oxc.rs/) and [Prettier](https://prettier.io/) for linting and formatting

## Prerequisites

- [Node.js](https://nodejs.org/) `^22.18.0` or `>=24.12.0`
- [pnpm](https://pnpm.io/)
- A [Cesium ion](https://ion.cesium.com/) account and access token (used for world terrain and imagery)

## Getting Started

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Create a `.env` file from the example and set your Cesium ion token:

   ```sh
   cp .env.example .env
   ```

   ```dotenv
   VITE_CESIUM_ION_ACCESS_TOKEN=<your-cesium-ion-token>
   ```

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

## AI Disclosure

Since this is a personal project with the goal of learning both technologies, no AI has been used for the code.

See [AI-DECLARATION.md](./AI-DECLARATION.md) for details on how AI tools were used in this repository.
