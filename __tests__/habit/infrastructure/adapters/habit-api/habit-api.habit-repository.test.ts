import { Frequency, Habit } from '@/habit/domain';
import { HabitApiHabitRepository } from '@/habit/infrastructure/adapters';
import { httpClient } from '@/lib/http-client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/http-client');

describe('HabitApiHabitRepository', () => {
  let habitRepository: HabitApiHabitRepository;

  beforeEach(() => {
    habitRepository = new HabitApiHabitRepository(httpClient);
  });

  it('should save a habit', async () => {
    const habit: Habit = {
      id: '1',
      name: 'Daily Exercise',
      description: 'Exercise every day for 30 minutes',
      frequency: Frequency.DAILY,
      goal: 30,
    };

    const httpClientInstanceSpy = vi
      .spyOn(httpClient, 'post')
      .mockResolvedValue(habit);

    const savedHabit = await habitRepository.save(habit);
    expect(httpClientInstanceSpy).toHaveBeenCalledWith('/habit/create', habit);
    expect(savedHabit).toEqual(habit);
  });
});
