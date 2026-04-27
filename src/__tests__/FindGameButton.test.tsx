import { render, screen, fireEvent } from '@testing-library/react'
import { FindGameButton } from '@/components/lobby/FindGameButton'

describe('FindGameButton', () => {
  it('renders fixed "Find Game" button initially', () => {
    render(<FindGameButton />)
    expect(screen.getByRole('button', { name: /find game/i })).toBeInTheDocument()
  })

  it('switches to searching state when clicked', () => {
    render(<FindGameButton />)
    const findBtn = screen.getByRole('button', { name: /find game/i })
    
    fireEvent.click(findBtn)
    
    expect(screen.getByText(/searching for players\.\.\./i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /find game/i })).not.toBeInTheDocument()
  })

  it('can cancel the search and revert back to initial state', () => {
    render(<FindGameButton />)
    const findBtn = screen.getByRole('button', { name: /find game/i })
    
    // Start searching
    fireEvent.click(findBtn)
    
    // Cancel search
    const cancelBtn = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelBtn)
    
    expect(screen.getByRole('button', { name: /find game/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument()
  })
})
