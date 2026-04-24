# Chess GO Frontend

The frontend for **Chess GO**, a 4-player team-based chess game.

## Core Framework

- **Next.js 14/16 (App Router)**: Utilizing the latest routing and rendering features.
- **TypeScript**: Ensuring type safety across components and state.
- **Tailwind CSS**: Utility-first styling for responsive design.
- **Zustand**: Fast and scalable state management.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/__tests__`: Logic and component tests.
- `public`: Static assets.

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3001](http://localhost:3001)

## Implemented Tasks

### Sprint 1: Foundation

- **S1-T1: Initialize Next.js Project**: Set up the core framework with TypeScript, Tailwind, and App Router. [S1-T1_initialization_task.md](S1-T1_initialization_task.md)
- **S1-T2: Configure ESLint and Prettier**: Integrated linting and formatting rules for high code quality. [S1-T2_linting_prettier_task.md](S1-T2_linting_prettier_task.md)
- **S1-T3: Establish Folder Structure**: Organized `src/` into a scalable, feature-based architecture. [S1-T3_establish_folder_structure.md](S1-T3_establish_folder_structure.md)
- **S1-T4: Create /login and /register pages**: Implemented accessible authentication UI with reusable components. [S1-T4_auth_pages_task.md](S1-T4_auth_pages_task.md)
- **S1-T5: Implement userStore.ts using Zustand**: Global state management for auth with persistence and hydration handling. [S1-T5_zustand_auth_store_task.md](S1-T5_zustand_auth_store_task.md)
