import { RegistrationForm } from '@/components';
import { toast } from '@/components/ui/use-toast';
import { registerAction } from '@/user/infrastructure/actions/user.form-actions';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

vi.mock('@/user/infrastructure/actions/user.form-actions', () => ({
  registerAction: vi.fn(),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

describe('RegistrationForm', () => {
  const setup = () => {
    render(<RegistrationForm />);
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Register');
    return { nameInput, emailInput, passwordInput, submitButton };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    const { nameInput, emailInput, passwordInput } = setup();

    expect(nameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it('shows validation errors when submitting an empty form', async () => {
    const { submitButton } = setup();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is too short')).toBeDefined();
      expect(screen.getByText('Invalid email address')).toBeDefined();
      expect(screen.getByText('Password is too short')).toBeDefined();
    });
  });

  it('calls registerAction with correct data on valid form submission', async () => {
    const { nameInput, emailInput, passwordInput, submitButton } = setup();

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123@@' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(registerAction).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'Password123@@',
      });
    });
  });

  it('shows success toast when registration is successful', async () => {
    (registerAction as Mock).mockResolvedValue({
      message: 'johndoe@example.com registered successfully!',
      error: false,
    });

    const { nameInput, emailInput, passwordInput, submitButton } = setup();

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123@@' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'johndoe@example.com registered successfully!',
        variant: 'default',
      });
    });
  });

  it('shows error toast when registration fails', async () => {
    (registerAction as Mock).mockResolvedValue({
      message: 'User already exists',
      error: true,
    });

    const { nameInput, emailInput, passwordInput, submitButton } = setup();

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123@@' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'User already exists',
        variant: 'destructive',
      });
    });
  });
});
