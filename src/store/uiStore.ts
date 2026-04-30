import { create } from 'zustand';

/**
 * Interface for the UI store state and actions.
 * Manages global UI elements like modals, sidebars, and loading states.
 */
interface UIState {
  isQueueModalOpen: boolean;
  globalLoading: boolean;
  sidebarOpen: boolean;
  
  // Actions to update the UI state
  setQueueModal: (isOpen: boolean) => void;
  setGlobalLoading: (isLoading: boolean) => void;
  toggleSidebar: () => void;
}

/**
 * Zustand store for managing non-persistent UI state.
 */
export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isQueueModalOpen: false,
  globalLoading: false,
  sidebarOpen: false,

  /**
   * Updates the visibility of the matchmaking queue modal.
   */
  setQueueModal: (isOpen) => set({ isQueueModalOpen: isOpen }),

  /**
   * Sets the global loading overlay state.
   */
  setGlobalLoading: (isLoading) => set({ globalLoading: isLoading }),

  /**
   * Toggles the sidebar visibility.
   */
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
