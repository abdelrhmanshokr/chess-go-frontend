import { render, screen, fireEvent } from '@testing-library/react'
import LobbyPage from '@/app/lobby/page'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LobbyPage Integration', () => {
  const mockPush = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    
    // Set authenticated state
    useUserStore.setState({
      user: { id: '1', username: 'tester', email: 'test@test.com' },
      isAuthenticated: true
    })
    
    useUIStore.setState({ isQueueModalOpen: false })
  })

  it('renders MatchmakingOverlay when queue button is clicked', () => {
    render(<LobbyPage />)
    
    // Check overlay is not there initially
    expect(screen.queryByText(/finding match/i)).not.toBeInTheDocument()
    
    // Find the "Find Game" button and click it
    const findGameBtn = screen.getByRole('button', { name: /find game/i })
    fireEvent.click(findGameBtn)
    
    // Overlay should now be visible
    expect(screen.getByText(/finding match/i)).toBeInTheDocument()
    expect(useUIStore.getState().isQueueModalOpen).toBe(true)
  })

  it('closes MatchmakingOverlay when cancel is clicked in Lobby', () => {
    render(<LobbyPage />)
    
    const findGameBtn = screen.getByRole('button', { name: /find game/i })
    fireEvent.click(findGameBtn)
    
    const cancelBtn = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelBtn)
    
    expect(screen.queryByText(/finding match/i)).not.toBeInTheDocument()
    expect(useUIStore.getState().isQueueModalOpen).toBe(false)
  })
})
