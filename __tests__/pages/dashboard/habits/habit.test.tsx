import HabitPage from '@/app/dashboard/habits/page';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/habit/infrastructure', () => ({
  getHabits: async () => [
    {
      id: '1',
      name: 'Meditate',
      frequency: 'DAILY',
      description: 'Meditate for 10 minutes',
      goal: 10,
      completed: true,
      progress: 10,
    },
    {
      id: '2',
      name: 'Exercise',
      frequency: 'WEEKLY',
      description: 'Run 5km',
      goal: 5,
      completed: true,
      progress: 5,
    },
    {
      id: '3',
      name: 'Read 30 minutes',
      frequency: 'DAILY',
      description: 'Read a book for 30 minutes',
      goal: 30,
      completed: false,
      progress: 15,
    },
  ],
}));

describe(HabitPage, () => {
  it('should render', async () => {
    const page = render(await HabitPage());
    expect(page).toBeDefined();
  });
});
