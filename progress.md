# Project Progress

## Completed Tasks
| Task ID | Description | Completed On | Notes |
|---------|-------------|--------------|-------|
| S0-T1 | Create project_main_idea.md | 2026-04-06 | Unified project vision |
| S0-T2 | Create frontend-plan.md | 2026-04-06 | Sprint-by-sprint guide |
| S0-T3 | Initialize plan_and_progress.md | 2026-04-06 | Tracking status |
| S1-T1 | Initialize Next.js 14 project | 2026-04-20 | Foundation setup |

## Pending Tasks
### Sprint 1: Foundation (Next.js & Auth)
- [ ] Story 1: Project Initialization
  - [x] **S1-T1**: Initialize Next.js 14 project with App Router, TypeScript, and Tailwind CSS.
  - [ ] **S1-T2**: Configure ESLint/Prettier for consistent styling.
  - [ ] **S1-T3**: Establish folder structure: `src/app`, `src/components`, `src/hooks`, `src/store`, `src/lib`, `src/types`, `src/utils`.
- [ ] Story 2: Authentication Base
  - [ ] **S1-T4**: Create `/login` and `/register` pages with Tailwind-styled forms.
  - [ ] **S1-T5**: Implement `userStore.ts` using Zustand to manage auth state and JWT.
  - [ ] **S1-T6**: Develop `useAuth` hook for calling login/register endpoints.
  - [ ] **S1-T7**: Set up basic layout with a shared navbar for auth status.

### Sprint 2: Lobby & Matchmaking UI
- [ ] Story 3: Lobby & Queue
  - [ ] **S2-T1**: Create `/lobby` page with a "Find Game" button.
  - [ ] **S2-T2**: Implement `uiStore.ts` for handling modal visibility and loading states.
  - [ ] **S2-T3**: Display a "Finding Teammate/Opponents..." overlay while in queue.
  - [ ] **S2-T4**: Mock the transition to a game once a "match" is found.

### Sprint 3: Chess Board Component
- [ ] Story 4: Board Rendering
  - [ ] **S3-T1**: Implement `ChessBoard` component using `react-chessboard` (or custom SVG).
  - [ ] **S3-T2**: Wrap `chess.js` in `lib/chess.ts` for unified move validation and FEN handling.
  - [ ] **S3-T3**: Implement drag-and-drop or tap-to-move interactions.

### Sprint 4: Real-time Sync (WebSockets)
- [ ] Story 5: Game WebSocket Integration
  - [ ] **S4-T1**: Implement `lib/socket.ts` as a singleton Socket.io-client instance.
  - [ ] **S4-T2**: Create `useGameSocket` hook to join/leave rooms and emit `makeMove`.
  - [ ] **S4-T3**: Bind server events (`moveMade`, `gameStateUpdate`) to `gameStore.ts`.
  - [ ] **S4-T4**: Handle move animations when teammates or opponents move.

### Sprint 5: Timer & Game Status UI
- [ ] Story 6: Individual & Team Timers
  - [ ] **S5-T1**: Create `IndividualTimer` and `TeamTimer` components.
  - [ ] **S5-T2**: Develop `useTimerSync.ts` to decrement clocks based on server timestamps.
  - [ ] **S5-T3**: Add visual feedback (pulsing/red) when a timer is below 10 seconds.
  - [ ] **S5-T4**: Implement `TurnIndicator` to show which of the 4 players is moving.

### Sprint 6: User Progression & Stats
- [ ] Story 7: Profile & Leaderboard
  - [ ] **S6-T1**: Create `/profile/[id]` with Elo history tracking.
  - [ ] **S6-T2**: Integrate Recharts to visualize Elo gains/losses over time.
  - [ ] **S6-T3**: Create `/leaderboard` table fetching top 100 users via `useApi`.

### Sprint 7: Polish & Deployment
- [ ] Story 8: Responsive Board & Errors
  - [ ] **S7-T1**: Refine CSS to ensure board is playable on small touch screens.
  - [ ] **S7-T2**: Implement global error boundary and toast notifications for connection issues.
  - [ ] **S7-T3**: Set up environment variables for Vercel deployment.

## Failed / Blocked Tasks
- (none)

## Current Focus
- Sprint 1: Project Initialization

