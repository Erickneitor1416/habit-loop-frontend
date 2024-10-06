import { BACKEND_URL } from '@/constants/constants';
import { httpClient } from '@/lib/http-client';
import { User, UserRepository } from '@/user/domain';

export class HabitApiUserRepository extends UserRepository {
  baseUrl = BACKEND_URL;
  private readonly httpClientInstance = httpClient;
  async save(user: User): Promise<User | null> {
    const response = await this.httpClientInstance.post<{
      accessToken: string;
      user: User;
    }>('/user/register', user);
    return response.user;
  }
  findByEmail(userEmail: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; user: User } | null> {
    const response = await this.httpClientInstance.post<{
      accessToken: string;
      user: User;
    }>('/user/login', {
      email,
      password,
    });
    return response;
  }
}
