import { HabitRepository } from '@/habit/domain';
import { HabitApiHabitRepository } from '@/habit/infrastructure';
import { httpClient } from '@/lib/http-client';

export class HabitUseCaseFactory {
  private static instance: HabitUseCaseFactory;
  private readonly habitRepository: HabitRepository;

  constructor(repository: HabitRepository) {
    this.habitRepository = repository;
  }

  public static getInstance(repository: HabitRepository) {
    if (!this.instance) {
      this.instance = new HabitUseCaseFactory(repository);
    }
    return this.instance;
  }

  public createUseCases<T>(
    useCaseClass: new (userRepository: HabitRepository) => T,
  ): T {
    return new useCaseClass(this.habitRepository);
  }
}
export const habitUseCaseFactory = (token: string) => {
  httpClient.setBearer(token);
  return HabitUseCaseFactory.getInstance(
    new HabitApiHabitRepository(httpClient),
  );
};
