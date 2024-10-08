import { BACKEND_URL } from '@/constants/constants';
import { Habit, HabitRepository } from '@/habit/domain';
import { HttpClient } from '@/lib/http-client';

export class HabitApiHabitRepository extends HabitRepository {
  baseUrl = BACKEND_URL;
  private readonly httpClientInstance;
  constructor(httpClient: HttpClient) {
    super();
    this.httpClientInstance = httpClient;
  }
  update(habit: Habit): Promise<Habit> {
    throw new Error(`Method not implemented.${habit.name}`);
  }
  delete(habit: Habit): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(userId: string): Promise<Habit[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Habit | null> {
    throw new Error('Method not implemented.');
  }
  async save(habit: Habit): Promise<Habit | null> {
    const response = await this.httpClientInstance.post<Habit>(
      `/habit/create`,
      habit,
    );
    return response;
  }
}
