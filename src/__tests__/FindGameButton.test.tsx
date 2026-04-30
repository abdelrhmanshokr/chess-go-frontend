import { render, screen, fireEvent } from '@testing-library/react'
import { FindGameButton } from '@/components/lobby/FindGameButton'
import { useUIStore } from '@/store/uiStore'

describe('FindGameButton', () => {
  beforeEach(() => {
    useUIStore.setState({ isQueueModalOpen: false });
  });

  it('renders fixed "Find Game" button initially', () => {
    render(<FindGameButton />)
    expect(screen.getByRole('button', { name: /find game/i })).toBeInTheDocument()
  })

  it('updates uiStore state when clicked', () => {
    render(<FindGameButton />)
    const findBtn = screen.getByRole('button', { name: /find game/i })
    
    fireEvent.click(findBtn)
    
    expect(useUIStore.getState().isQueueModalOpen).toBe(true)
  })
})
