import HomePage from '@/app/page';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe(HomePage, () => {
  it('should render', () => {
    const { getByRole } = render(<HomePage />);
    const main = within(getByRole('main'));
    expect(
      main.getByRole('heading', { level: 1, name: /Habit Loop app/i }),
    ).toBeDefined();

    expect(getByRole('img', { name: /Logo/i })).toBeDefined();
  });

  it('should display the header with the correct text and ModeToggle component', () => {
    render(<HomePage />);

    expect(screen.getByText(/Habit Loop app/)).toBeDefined();
    expect(screen.getByText(/by Erick Muñoz/)).toBeDefined();

    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeDefined();
  });

  it('should render the logo image', () => {
    render(<HomePage />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeDefined();
    expect(logo).toHaveProperty(
      'src',
      expect.stringContaining('habit-loop-logo.png'),
    );
  });
});
