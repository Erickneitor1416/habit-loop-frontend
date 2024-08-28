import RegisterPage from '@/app/page';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe(RegisterPage, () => {
  it('should render', () => {
    const { getByRole } = render(<RegisterPage />);
    const main = within(getByRole('main'));
    expect(
      main.getByRole('heading', { level: 1, name: /Habit Loop app/i }),
    ).toBeDefined();

    expect(getByRole('img', { name: /Logo/i })).toBeDefined();
  });

  it('should display the header with the correct text and ModeToggle component', () => {
    render(<RegisterPage />);

    expect(screen.getByText(/Habit Loop app/)).toBeDefined();
    expect(screen.getByText(/by Erick Muñoz/)).toBeDefined();

    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeDefined();
  });

  it('should render the RegistrationForm component', () => {
    render(<RegisterPage />);

    expect(
      screen.getByRole('button', {
        name: 'Register',
      }),
    ).toBeDefined();
  });

  it('should render the logo image', () => {
    render(<RegisterPage />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeDefined();
    expect(logo).toHaveProperty(
      'src',
      expect.stringContaining('habit-loop-logo.png'),
    );
  });
});
