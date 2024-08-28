import { BACKEND_URL } from '@/constants/constants';
import { httpClient } from '@/lib/http-client';
import { User, UserRepository } from '@/user/domain';

export class HabitApiUserRepository extends UserRepository {
  baseUrl = BACKEND_URL;
  private httpClientInstance = httpClient;
  async save(user: User): Promise<User | null> {
    const response = await this.httpClientInstance.post<User>(
      '/user/register',
      user,
    );
    return response;
  }
  findById(userId: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
