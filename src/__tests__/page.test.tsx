import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders the getting started message', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /to get started, edit the page\.tsx file\./i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders the learn more link', () => {
    render(<Home />);

    const learnLink = screen.getByRole('link', { name: /learning/i });
    expect(learnLink).toBeInTheDocument();
    expect(learnLink).toHaveAttribute(
      'href',
      expect.stringContaining('nextjs.org/learn')
    );
  });
});
