import { RegisterUserUseCase } from '@/user/application';
import { User } from '@/user/domain';
import { MemoryUserRepository } from '@/user/infrastructure/adapters';
import { describe, expect, it } from 'vitest';

describe(RegisterUserUseCase, () => {
  const userRepository = new MemoryUserRepository();
  const useCase = new RegisterUserUseCase(userRepository);

  it('should return the saved user', async () => {
    const user = new User('testUserId', 'testUserName', 'testUserEmail');
    const result = await useCase.execute(user);
    expect(result).toBe(user);
  });
});
