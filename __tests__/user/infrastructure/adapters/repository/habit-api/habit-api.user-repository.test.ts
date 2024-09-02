import { httpClient } from '@/lib/http-client';
import { User } from '@/user/domain';
import { HabitApiUserRepository } from '@/user/infrastructure/adapters';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('HabitApiUserRepository', () => {
  let userRepository: HabitApiUserRepository;

  beforeEach(() => {
    userRepository = new HabitApiUserRepository();
  });

  it('should save a user', async () => {
    const user: User = {
      id: '1',
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
});
