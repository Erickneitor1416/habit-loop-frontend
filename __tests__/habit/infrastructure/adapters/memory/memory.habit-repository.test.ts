import { Frequency, Habit } from '@/habit/domain';
import { MemoryHabitRepository } from '@/habit/infrastructure';
import { describe, expect, it } from 'vitest';

describe('MemoryHabitRepository', () => {
  const repository = MemoryHabitRepository.getInstance();

  it('findById should return null if habit is not found', async () => {
    const result = await repository.findById('nonexistent-id');
    expect(result).toBeNull();
  });

  it('findById should return the habit if found', async () => {
    const habit: Habit = {
      id: '1',
      name: 'Daily Exercise',
      description: 'Exercise every day for 30 minutes',
      frequency: Frequency.DAILY,
      goal: 30,
    };
    await repository.save(habit);
    const result = await repository.findById('1');
    expect(result).toEqual(habit);
  });

  it('save should save the habit', async () => {
    const habit: Habit = {
      id: '2',
      name: 'Read a book',
      description: 'Read one book per month',
      frequency: Frequency.MONTHLY,
      goal: 1,
    };
    const savedHabit = await repository.save(habit);
    expect(savedHabit).toEqual(habit);
  });

  it('save should not save a habit if it already exists', async () => {
    const habit: Habit = {
      id: '3',
      name: 'Write daily',
      description: 'Write at least one page every day',
      frequency: Frequency.DAILY,
      goal: 1,
    };
    await repository.save(habit);
    const duplicateHabit: Habit = {
      id: '4',
      name: 'Write daily',
      description: 'Write even more',
      frequency: Frequency.DAILY,
      goal: 2,
    };
    const result = await repository.save(duplicateHabit);
    expect(result).toBeNull();
  });

  it('update should update the habit', async () => {
    const habit: Habit = {
      id: '5',
      name: 'Meditate',
      description: 'Meditate for 10 minutes daily',
      frequency: Frequency.DAILY,
      goal: 10,
    };
    await repository.save(habit);

    const updatedHabit: Habit = {
      id: '5',
      name: 'Meditate',
      description: 'Meditate for 15 minutes daily',
      frequency: Frequency.DAILY,
      goal: 15,
    };
    await repository.update(updatedHabit);
    const result = await repository.findById('5');
    expect(result).toEqual(updatedHabit);
  });

  it('delete should remove the habit', async () => {
    const habit: Habit = {
      id: '6',
      name: 'Go for a walk',
      description: 'Walk for at least 30 minutes',
      frequency: Frequency.DAILY,
      goal: 1,
    };
    await repository.save(habit);
    await repository.delete(habit);
    const result = await repository.findById('6');
    expect(result).toBeNull();
  });

  it('findAll should return all habits', async () => {
    const habit1: Habit = {
      id: '7',
      name: 'Yoga',
      description: 'Do yoga every morning',
      frequency: Frequency.DAILY,
      goal: 1,
    };
    const habit2: Habit = {
      id: '8',
      name: 'Drink water',
      description: 'Drink at least 2 liters of water',
      frequency: Frequency.DAILY,
      goal: 2,
    };
    const repository = new MemoryHabitRepository();
    await repository.save(habit1);
    await repository.save(habit2);
    const result = await repository.findAll('user-id');
    expect(result).toEqual([habit1, habit2]);
  });
});
