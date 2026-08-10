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
- **S1-T6: Develop useAuth hook**: Custom hook for API interaction, loading states, and state synchronization. [S1-T6_useAuth_hook_task.md](S1-T6_useAuth_hook_task.md)
- **S1-T7: Set up basic layout with a shared navbar**: Global navigation with dynamic auth states and responsive design. [S1-T7_navbar_layout_task.md](S1-T7_navbar_layout_task.md)

### Sprint 2: Lobby & Matchmaking UI
- **S2-T1: Create /lobby page**: Primary user dashboard with protected routes and matchmaking entry point. [S2-T1_lobby_page_task.md](S2-T1_lobby_page_task.md)
- **S2-T2: Implement uiStore.ts**: Global UI state management for modals, loading states, and sidebar visibility. [S2-T2_ui_store_task.md](S2-T2_ui_store_task.md)
- **S2-T3: Display "Finding Match" overlay**: `MatchmakingOverlay` component showing a semi-transparent backdrop, spinner, wait-time indicator, and Cancel action while in the matchmaking queue. Driven entirely by `uiStore`'s `isQueueModalOpen` state and mounted in `src/app/lobby/page.tsx`. [current_task/S2-T3_matchmaking_overlay_task.md](current_task/S2-T3_matchmaking_overlay_task.md)
- **Story 4.0 (S2-T5 → S2-T8): Site Theme Update**: Rolled out a new "Dark Wood & Gold"-inspired theme (see [THEME.md](THEME.md)) across the app. Theme colors are defined as CSS custom properties in `src/app/globals.css` (`--theme-bg-primary`, `--theme-surface`, `--theme-accent-primary`, `--theme-accent-gradient-from/to`, `--theme-text-primary`, `--theme-text-muted`, `--theme-border`) and exposed as Tailwind v4 utilities (`bg-theme-surface`, `text-theme-text-muted`, etc.) via an `@theme inline` block. Applied to `Button`, `Card`, `Navbar`, `Input`, the Lobby page, `MatchmakingOverlay`, and the `/login`/`/register` pages, replacing the previous zinc palette. [current_task/S2-Story4_theme_update_tasks.md](current_task/S2-Story4_theme_update_tasks.md)
- **S2-T4: Mock the transition to a game once a "match" is found**: `MatchmakingOverlay` now runs a 4s mock timer while the queue modal is open; on resolution it closes the modal and routes to a new placeholder `/game` page (auth-guarded like `/lobby`), which will be replaced by the real `ChessBoard` view in Sprint 3. Clicking "Cancel" clears the pending timer with no navigation. [current_task/S2-T4_mock_match_found_task.md](current_task/S2-T4_mock_match_found_task.md)
