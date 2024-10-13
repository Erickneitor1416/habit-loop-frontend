import { FindHabitsUseCase } from '@/habit/application/find-habits.use-case';
import { habitUseCaseFactory } from '@/habit/factories';
import { config } from '@/lib/next-auth-config';
import { getServerSession } from 'next-auth';

export const getHabits = async () => {
  const session = await getServerSession(config);
  const token = session?.user?.accessToken!;
  const useCase = habitUseCaseFactory(token).createUseCases(FindHabitsUseCase);
  const habits = await useCase.execute();
  return habits;
};
