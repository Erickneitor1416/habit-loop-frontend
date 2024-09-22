import { LoginForm } from '@/components';
import { toast } from '@/components/ui/use-toast';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

describe('LoginForm', () => {
  const mockPush = vi.fn();

  const setup = () => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('login');
    return { emailInput, passwordInput, submitButton };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    const { emailInput, passwordInput } = setup();

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(screen.getByText('Sign in')).toBeDefined();
    expect(
      screen.getByText(
        'Access to your account to start building healthy habits.',
      ),
    ).toBeDefined();
  });

  it('shows validation errors when submitting an empty form', async () => {
    const { submitButton } = setup();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeDefined();
      expect(screen.getByText('Password is too short')).toBeDefined();
    });
  });

  it('calls signIn with correct data on valid form submission', async () => {
    const { emailInput, passwordInput, submitButton } = setup();

    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123@@' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'johndoe@example.com',
        password: 'Password123@@',
        redirect: false,
      });
    });
  });

  it('redirects to home page when login is successful', async () => {
    (signIn as Mock).mockResolvedValue({ error: null });

    const { emailInput, passwordInput, submitButton } = setup();

    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123@@' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('shows error toast when login fails', async () => {
    (signIn as Mock).mockResolvedValue({ error: 'Invalid credentials' });

    const { emailInput, passwordInput, submitButton } = setup();

    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'WrongPassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Invalid credentials',
        variant: 'destructive',
      });
    });
  });
});
