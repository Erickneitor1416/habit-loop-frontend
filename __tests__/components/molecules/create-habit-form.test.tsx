import { CreateHabitForm } from '@/components';
import { toast } from '@/components/ui/use-toast';
import { Frequency } from '@/habit/domain';
import { HabitNotCreated } from '@/habit/domain/exceptions';
import { createHabitAction } from '@/habit/infrastructure';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

vi.mock('@/habit/infrastructure/actions/habit-form.actions', () => ({
  createHabitAction: vi.fn(),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => {
    return {
      push: vi.fn(),
    };
  }),
}));

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        accessToken: 'fakeAccessToken123',
      },
    },
    status: 'authenticated',
  })),
}));

describe('CreateHabitForm', () => {
  const setup = () => {
    render(<CreateHabitForm />);
    const nameInput = screen.getByPlaceholderText('Enter habit name');
    const descriptionInput = screen.getByPlaceholderText(
      'Enter habit description',
    );
    const frequencyInput = screen.getByRole('combobox');
    const goalInput = screen.getByPlaceholderText('Enter habit goal');
    const submitButton = screen.getByText('Save habit');
    return {
      nameInput,
      descriptionInput,
      frequencyInput,
      submitButton,
      goalInput,
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    const {
      nameInput,
      descriptionInput,
      frequencyInput,
      goalInput,
      submitButton,
    } = setup();
    expect(nameInput).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(frequencyInput).toBeDefined();
    expect(submitButton).toBeDefined();
    expect(goalInput).toBeDefined();
  });

  it('shows validation errors when submitting an empty form', async () => {
    const { submitButton } = setup();
    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeDefined();
      expect(screen.getByText('Description is required')).toBeDefined();
      expect(screen.getAllByText('Required')).toHaveLength(2);
    });
  });

  it('calls createHabitAction with correct data on valid form submission', async () => {
    const {
      nameInput,
      descriptionInput,
      frequencyInput,
      goalInput,
      submitButton,
    } = setup();

    fireEvent.change(nameInput, { target: { value: 'Exercise' } });
    fireEvent.change(descriptionInput, { target: { value: 'test' } });
    fireEvent.click(frequencyInput);
    fireEvent.click(screen.getAllByText('DAILY')[1]);
    fireEvent.change(goalInput, { target: { value: 1 } });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(createHabitAction).toHaveBeenCalledWith(
        {
          name: 'Exercise',
          description: 'test',
          frequency: Frequency.DAILY,
          goal: 1,
        },
        'fakeAccessToken123',
      );
    });
  });

  it('shows success toast when registration is successful', async () => {
    (createHabitAction as Mock).mockResolvedValue(
      'habit registered successfully!',
    );

    const {
      nameInput,
      descriptionInput,
      frequencyInput,
      submitButton,
      goalInput,
    } = setup();

    fireEvent.change(nameInput, { target: { value: 'Exercise' } });
    fireEvent.change(descriptionInput, { target: { value: 'test' } });
    fireEvent.click(frequencyInput);
    fireEvent.click(screen.getAllByText('DAILY')[1]);
    fireEvent.change(goalInput, { target: { value: 1 } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'habit registered successfully!',
        variant: 'default',
      });
    });
  });

  it('shows error toast when registration fails', async () => {
    (createHabitAction as Mock).mockRejectedValue(new HabitNotCreated());

    const {
      nameInput,
      descriptionInput,
      frequencyInput,
      submitButton,
      goalInput,
    } = setup();

    fireEvent.change(nameInput, { target: { value: 'Exercise' } });
    fireEvent.change(descriptionInput, { target: { value: 'test' } });
    fireEvent.click(frequencyInput);
    fireEvent.click(screen.getAllByText('DAILY')[1]);
    fireEvent.change(goalInput, { target: { value: 1 } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Failed to save habit',
        variant: 'destructive',
      });
    });
  });
});
