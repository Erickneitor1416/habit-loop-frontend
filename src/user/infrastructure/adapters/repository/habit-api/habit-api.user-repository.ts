import { User, UserRepository } from '@/user/domain';

export class HabitApiUserRepository extends UserRepository {
  baseUrl = 'http://localhost:3000';
  async save(user: User): Promise<User | null> {
    const response = await fetch(`${this.baseUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const responseJson = await response.json();
    console.log(responseJson, JSON.stringify(user));
    return responseJson;
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
