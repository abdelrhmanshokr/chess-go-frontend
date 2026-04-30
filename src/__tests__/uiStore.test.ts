import { useUIStore } from '@/store/uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUIStore.setState({
      isQueueModalOpen: false,
      globalLoading: false,
      sidebarOpen: false,
    });
  });

  it('initially has default state', () => {
    const state = useUIStore.getState();
    expect(state.isQueueModalOpen).toBe(false);
    expect(state.globalLoading).toBe(false);
    expect(state.sidebarOpen).toBe(false);
  });

  it('updates isQueueModalOpen via setQueueModal', () => {
    const { setQueueModal } = useUIStore.getState();
    
    setQueueModal(true);
    expect(useUIStore.getState().isQueueModalOpen).toBe(true);
    
    setQueueModal(false);
    expect(useUIStore.getState().isQueueModalOpen).toBe(false);
  });

  it('updates globalLoading via setGlobalLoading', () => {
    const { setGlobalLoading } = useUIStore.getState();
    
    setGlobalLoading(true);
    expect(useUIStore.getState().globalLoading).toBe(true);
  });

  it('toggles sidebarOpen via toggleSidebar', () => {
    const { toggleSidebar } = useUIStore.getState();
    
    toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(true);
    
    toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(false);
  });
});
