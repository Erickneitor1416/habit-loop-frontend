import { LoginUserUseCase } from '@/user/application';
import { User } from '@/user/domain';
import { MemoryUserRepository } from '@/user/infrastructure/adapters';
import { describe, expect, it } from 'vitest';

describe(LoginUserUseCase, () => {
  const userRepository = new MemoryUserRepository();
  const useCase = new LoginUserUseCase(userRepository);

  it('should return the saved user', async () => {
    const user = new User('testUserId', 'testUserName', 'testUserEmail');
    await userRepository.save(user);
    const result = await useCase.execute(user);
    expect(result?.user).toBe(user);
    expect(result?.accessToken).toBeDefined();
  });
});
