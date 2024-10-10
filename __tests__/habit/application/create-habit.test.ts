import { CreateHabitUseCase } from '@/habit/application';
import { Frequency, Habit } from '@/habit/domain';
import { MemoryHabitRepository } from '@/habit/infrastructure/adapters';
import { describe, expect, it } from 'vitest';

describe(CreateHabitUseCase, () => {
  const habitRepository = MemoryHabitRepository.getInstance();
  const useCase = new CreateHabitUseCase(habitRepository);

  it('should return the saved user', async () => {
    const user = new Habit(
      'Test Habit',
      'Test Description',
      Frequency.DAILY,
      1,
      '123',
    );
    const result = await useCase.execute(user);
    expect(result).toBe(user);
  });
});
