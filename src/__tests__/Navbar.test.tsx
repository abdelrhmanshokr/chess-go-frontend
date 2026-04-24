import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'
import { useUserStore } from '@/store/userStore'
import { useAuth } from '@/hooks/useAuth'

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('Navbar', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
    // Reset store to unauthenticated by default
    useUserStore.setState({ isAuthenticated: false, user: null });
  });

  it('renders logo link to home', () => {
    render(<Navbar />)
    const logoLink = screen.getByRole('link', { name: /go chess/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('shows Login and Register when not authenticated', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /lobby/i })).not.toBeInTheDocument()
  })

  it('shows Lobby, Profile, and Logout when authenticated', () => {
    useUserStore.setState({ 
      isAuthenticated: true, 
      user: { id: '1', username: 'chessplayer', email: 'test@e.com' } 
    });
    
    render(<Navbar />)
    
    expect(screen.getByRole('link', { name: /lobby/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument()
    expect(screen.getByText('chessplayer')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument()
  })

  it('calls logout when Logout button is clicked', () => {
    useUserStore.setState({ isAuthenticated: true });
    
    render(<Navbar />)
    const logoutBtn = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutBtn)
    
    expect(mockLogout).toHaveBeenCalledTimes(1)
  })
})
