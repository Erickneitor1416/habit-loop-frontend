import { Habit, HabitRepository } from '@/habit/domain';

export class MemoryHabitRepository extends HabitRepository {
  private readonly habits: Habit[] = [];
  public static instance: MemoryHabitRepository;
  async findById(id: string): Promise<Habit | null> {
    const habit = this.habits.find(h => h.id === id);
    if (!habit) return Promise.resolve(null);
    return Promise.resolve(habit);
  }
  async findAll(): Promise<Habit[]> {
    return Promise.resolve(this.habits);
  }
  async save(habit: Habit): Promise<Habit | null> {
    if (this.habits.find(h => h.name === habit.name))
      return Promise.resolve(null);
    this.habits.push(habit);

    return Promise.resolve(habit);
  }
  async update(habit: Habit): Promise<Habit> {
    const index = this.habits?.findIndex(h => h.id === habit.id);
    this.habits[index] = habit;
    return Promise.resolve(habit);
  }
  async delete(habit: Habit): Promise<void> {
    const index = this.habits?.findIndex(h => h.id === habit.id);
    this.habits.splice(index, 1);
    return Promise.resolve();
  }

  public static getInstance(): MemoryHabitRepository {
    if (!MemoryHabitRepository.instance) {
      MemoryHabitRepository.instance = new MemoryHabitRepository();
    }
    return MemoryHabitRepository.instance;
  }
}
