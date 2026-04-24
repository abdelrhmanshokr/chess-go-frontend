import { render, screen, fireEvent } from '@testing-library/react'
import RegisterPage from '@/app/(auth)/register/page'

// Mock the next/navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('RegisterPage', () => {
  it('renders all registration form fields', () => {
    render(<RegisterPage />)
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/password/i)).toHaveLength(2) // Password and Confirm Password
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('allows entering user details', () => {
    render(<RegisterPage />)
    
    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
    
    fireEvent.change(usernameInput, { target: { value: 'chessplayer1' } })
    fireEvent.change(emailInput, { target: { value: 'player@example.com' } })
    
    expect(usernameInput.value).toBe('chessplayer1')
    expect(emailInput.value).toBe('player@example.com')
  })

  it('shows error message if passwords do not match during form submission', () => {
    render(<RegisterPage />)
    
    const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i) as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /register/i })
    
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } })
    
    fireEvent.submit(screen.getByLabelText('registration-form'))
    
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('has a link to the login page', () => {
    render(<RegisterPage />)
    
    const loginLink = screen.getByRole('link', { name: /sign in/i })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
  })
})
