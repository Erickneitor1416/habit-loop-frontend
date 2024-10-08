import { CreateHabitUseCase } from '@/habit/application';
import { Frequency, Habit } from '@/habit/domain';
import { HabitNotCreated } from '@/habit/domain/exceptions';
import { HabitUseCaseFactory, habitUseCaseFactory } from '@/habit/factories';
import {
  MemoryHabitRepository,
  createHabitAction,
} from '@/habit/infrastructure';
import { describe, expect, it, vi } from 'vitest';

vi.spyOn(HabitUseCaseFactory.prototype, 'createUseCases').mockImplementation(
  useCase => {
    return new useCase(MemoryHabitRepository.getInstance());
  },
);
describe(createHabitAction, () => {
  const mockedToken = 'mocked-token';
  it('should return an error if the habit object is invalid', async () => {
    const invalidHabit = new Habit('', '', Frequency.DAILY, 0);
    await expect(
      createHabitAction(invalidHabit, mockedToken),
    ).rejects.toThrowError(HabitNotCreated);
  });

  it('should call CreateHabitUseCase.execute if the habit is valid', async () => {
    const validHabit = new Habit('Exercise tests', 'Daily', Frequency.DAILY, 5);

    const result = await createHabitAction(validHabit, mockedToken);

    expect(
      habitUseCaseFactory(mockedToken).createUseCases,
    ).toHaveBeenCalledWith(CreateHabitUseCase);

    expect(result).toEqual(`${validHabit.name} registered successfully!`);
  });

  it('should return an error message if RegisterHabitUseCase throws an error', async () => {
    const validHabit = new Habit('Exercise test', 'Daily', Frequency.DAILY, 5);
    await createHabitAction(validHabit, mockedToken);
    await expect(
      createHabitAction(validHabit, mockedToken),
    ).rejects.toThrowError(HabitNotCreated);
  });
});
