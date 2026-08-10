import { render, screen, fireEvent } from '@testing-library/react'
import { MatchmakingOverlay } from '@/components/lobby/MatchmakingOverlay'
import { useUIStore } from '@/store/uiStore'

describe('MatchmakingOverlay', () => {
  beforeEach(() => {
    useUIStore.setState({ isQueueModalOpen: false });
  });

  it('does not render when isQueueModalOpen is false', () => {
    render(<MatchmakingOverlay />)
    expect(screen.queryByText(/finding match/i)).not.toBeInTheDocument()
  })

  it('renders when isQueueModalOpen is true', () => {
    useUIStore.setState({ isQueueModalOpen: true });
    render(<MatchmakingOverlay />)
    expect(screen.getByText(/finding match/i)).toBeInTheDocument()
    expect(screen.getByText(/finding teammate\/opponents\.\.\./i)).toBeInTheDocument()
  })

  it('contains an animated spinner and wait time', () => {
    useUIStore.setState({ isQueueModalOpen: true });
    render(<MatchmakingOverlay />)
    expect(screen.getByText(/wait time/i)).toBeInTheDocument()
    expect(screen.getByText(/00:15/i)).toBeInTheDocument()
  })

  it('closes when cancel button is clicked', () => {
    useUIStore.setState({ isQueueModalOpen: true });
    render(<MatchmakingOverlay />)
    
    const cancelBtn = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelBtn)
    
    expect(useUIStore.getState().isQueueModalOpen).toBe(false)
  })
})
