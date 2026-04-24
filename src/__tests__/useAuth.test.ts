import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/store/userStore';
import fetchMock from 'jest-fetch-mock';

describe('useAuth', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    const { clearAuth } = useUserStore.getState();
    clearAuth();
  });

  it('login updates store on success', async () => {
    const mockUser = { id: '1', username: 'test', email: 'test@example.com' };
    const mockToken = 'token123';
    
    fetchMock.mockResponseOnce(JSON.stringify({
      user: mockUser,
      token: mockToken
    }));

    const { result } = renderHook(() => useAuth());

    let success;
    await act(async () => {
      const response = await result.current.login('test@example.com', 'password');
      success = response.success;
    });

    expect(success).toBe(true);
    const store = useUserStore.getState();
    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toEqual(mockUser);
    expect(store.token).toBe(mockToken);
    expect(result.current.isLoading).toBe(false);
  });

  it('login sets error on failure', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: 'Invalid credentials' }),
      { status: 401 }
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'wrong');
    });

    expect(result.current.error).toBe('Invalid credentials');
    expect(useUserStore.getState().isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('register updates store on success', async () => {
    const mockUser = { id: '2', username: 'newuser', email: 'new@example.com' };
    const mockToken = 'newtoken';

    fetchMock.mockResponseOnce(JSON.stringify({
      user: mockUser,
      token: mockToken
    }));

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register('newuser', 'new@example.com', 'password');
    });

    const store = useUserStore.getState();
    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toEqual(mockUser);
  });

  it('logout clears the store', () => {
    const { setAuth } = useUserStore.getState();
    setAuth({ id: '1', username: 'user', email: 'e' }, 't');

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    const store = useUserStore.getState();
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBeNull();
  });
});
