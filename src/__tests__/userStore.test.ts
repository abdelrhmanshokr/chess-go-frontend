import { useUserStore } from '@/store/userStore';

describe('userStore', () => {
  // Clear the store before each test to ensure isolation
  beforeEach(() => {
    const { clearAuth } = useUserStore.getState();
    clearAuth();
    localStorage.clear();
  });

  it('initially has default auth state', () => {
    const state = useUserStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('updates state when setAuth is called', () => {
    const { setAuth } = useUserStore.getState();
    const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' };
    const mockToken = 'mock-jwt-token';

    setAuth(mockUser, mockToken);

    const state = useUserStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it('resets state when clearAuth is called', () => {
    const { setAuth, clearAuth } = useUserStore.getState();
    const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' };
    
    setAuth(mockUser, 'token');
    clearAuth();

    const state = useUserStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('persists state in localStorage', () => {
    const { setAuth } = useUserStore.getState();
    const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' };
    const mockToken = 'mock-jwt-token';

    setAuth(mockUser, mockToken);

    const storedValue = localStorage.getItem('chess-go-user-auth');
    expect(storedValue).not.toBeNull();
    
    const parsed = JSON.parse(storedValue!);
    expect(parsed.state.user).toEqual(mockUser);
    expect(parsed.state.token).toBe(mockToken);
    expect(parsed.state.isAuthenticated).toBe(true);
  });
});
