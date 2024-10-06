import { CreateHabitDialog } from '@/components/organisms';
import { DialogTrigger } from '@/components/ui/dialog';
import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('CreateHabitDialog', () => {
  beforeEach(() => {
    render(
      <CreateHabitDialog>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
      </CreateHabitDialog>,
    );
  });

  it('should render the dialog trigger button', () => {
    const triggerButton = screen.getByRole('button', { name: /open dialog/i });
    expect(triggerButton).toBeDefined();
  });

  it('should not show dialog content initially', () => {
    const dialogTitle = screen.queryByText(/create new habit/i);
    expect(dialogTitle).toBeNull();
  });

  it('should show dialog content when the trigger is clicked', () => {
    const triggerButton = screen.getByRole('button', { name: /open dialog/i });
    act(() => {
      triggerButton.click();
    });
    const dialogTitle = screen.getByText(/create new habit/i);

    const dialogDescription = screen.getByText(
      /start building healthy habits\./i,
    );
    const createHabitForm = screen.getByText('Enter habit frequency');
    expect(dialogTitle).toBeDefined();
    expect(dialogDescription).toBeDefined();
    expect(createHabitForm).toBeDefined();
  });
});
