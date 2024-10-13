import { Habit, HabitRepository } from '@/habit/domain';

export class FindHabitsUseCase {
  constructor(private readonly habitRepository: HabitRepository) {}

  async execute(): Promise<Habit[]> {
    const habits = await this.habitRepository.findAll();
    return habits;
  }
}
