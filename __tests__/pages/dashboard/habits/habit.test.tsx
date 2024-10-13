import HabitPage from '@/app/dashboard/habits/page';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe(HabitPage, () => {
  it('should render', async () => {
    const page = render(<HabitPage />);
    expect(page).toBeDefined();
  });
});
