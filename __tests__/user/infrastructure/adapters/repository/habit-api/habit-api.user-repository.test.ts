import { httpClient } from '@/lib/http-client';
import { User } from '@/user/domain';
import { HabitApiUserRepository } from '@/user/infrastructure/adapters';
import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
describe('HabitApiUserRepository', () => {
  let userRepository: HabitApiUserRepository;

  beforeEach(() => {
    userRepository = new HabitApiUserRepository();
  });

  it('should save a user', async () => {
    const user: User = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123@@',
    };

    const httpClientInstanceSpy = vi
      .spyOn(httpClient, 'post')
      .mockResolvedValue(user);

    const savedUser = await userRepository.save(user);

    expect(httpClientInstanceSpy).toHaveBeenCalledWith('/user/register', user);
    expect(savedUser).toEqual(user);
  });
  it('should login a user', async () => {
    const user: User = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123@@',
    };
    const httpClientInstanceSpy = vi
      .spyOn(httpClient, 'post')
      .mockResolvedValue({ user, accessToken: 'token' });
    const result = await userRepository.findByEmailAndPassword(
      user.email,
      user.password,
    );
    expect(httpClientInstanceSpy).toHaveBeenCalledWith('/user/login', {
      email: user.email,
      password: user.password,
    });
    expect(result?.user).toEqual(user);
    expect(result?.accessToken).toBeDefined();
  });
});
