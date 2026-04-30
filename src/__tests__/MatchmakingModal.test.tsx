import { render, screen, fireEvent } from '@testing-library/react'
import { MatchmakingModal } from '@/components/lobby/MatchmakingModal'
import { useUIStore } from '@/store/uiStore'

describe('MatchmakingModal', () => {
  beforeEach(() => {
    useUIStore.setState({ isQueueModalOpen: false });
  });

  it('does not render when isQueueModalOpen is false', () => {
    render(<MatchmakingModal />)
    expect(screen.queryByText(/finding match/i)).not.toBeInTheDocument()
  })

  it('renders when isQueueModalOpen is true', () => {
    useUIStore.setState({ isQueueModalOpen: true });
    render(<MatchmakingModal />)
    expect(screen.getByText(/finding match/i)).toBeInTheDocument()
    expect(screen.getByText(/scanning for available players/i)).toBeInTheDocument()
  })

  it('closes when cancel button is clicked', () => {
    useUIStore.setState({ isQueueModalOpen: true });
    render(<MatchmakingModal />)
    
    const cancelBtn = screen.getByRole('button', { name: /cancel search/i })
    fireEvent.click(cancelBtn)
    
    expect(useUIStore.getState().isQueueModalOpen).toBe(false)
  })
})
