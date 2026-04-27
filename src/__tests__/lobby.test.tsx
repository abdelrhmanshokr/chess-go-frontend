import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LobbyPage from '@/app/lobby/page'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { useHasHydrated } from '@/hooks/useHasHydrated'

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useHasHydrated
jest.mock('@/hooks/useHasHydrated', () => ({
  useHasHydrated: jest.fn(),
}));

describe('LobbyPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useHasHydrated as jest.Mock).mockReturnValue(true);
  });

  it('redirects to /login if not authenticated', async () => {
    useUserStore.setState({ isAuthenticated: false, user: null });
    
    render(<LobbyPage />)
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('renders greeting with username when authenticated', () => {
    useUserStore.setState({ 
      isAuthenticated: true, 
      user: { id: '1', username: 'grandmaster', email: 'gm@e.com' } 
    });
    
    render(<LobbyPage />)
    
    expect(screen.getByText(/welcome back,/i)).toBeInTheDocument();
    expect(screen.getByText('grandmaster')).toBeInTheDocument();
    expect(screen.getByText('Standard 4-Player')).toBeInTheDocument();
  });

  it('contains the Find Game button', () => {
    useUserStore.setState({ isAuthenticated: true, user: { id: '1', username: 'u', email: 'e' } });
    
    render(<LobbyPage />)
    
    expect(screen.getByRole('button', { name: /find game/i })).toBeInTheDocument();
  });
});
