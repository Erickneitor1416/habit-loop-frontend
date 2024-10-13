'use server';
import { CreateHabitUseCase } from '@/habit/application';
import { Habit, HabitSchema } from '@/habit/domain';
import { HabitNotCreated } from '@/habit/domain/exceptions';
import { habitUseCaseFactory } from '@/habit/factories';
import { revalidatePath } from 'next/cache';

const createHabitAction = async (
  habit: Habit,
  token: string,
): Promise<string> => {
  const parsed = HabitSchema.safeParse(habit);
  if (!parsed.success) {
    throw new HabitNotCreated(parsed.error.message);
  }
  const useCase = habitUseCaseFactory(token).createUseCases(CreateHabitUseCase);
  const savedHabit = await useCase.execute(parsed.data);
  revalidatePath('/dashboard/habits');
  return `${savedHabit?.name} registered successfully!`;
};

export { createHabitAction };
