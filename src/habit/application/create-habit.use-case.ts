import { Habit, HabitRepository } from '@/habit/domain';
import { HabitNotCreated } from '@/habit/domain/exceptions';
import { BaseUseCase } from '@/shared/base.use-case';

export class CreateHabitUseCase extends BaseUseCase<HabitRepository> {
  async execute(habit: Habit): Promise<Habit> {
    const savedHabit = await this.repository.save(habit);
    if (!savedHabit) {
      throw new HabitNotCreated();
    }
    return savedHabit;
  }
}
