import { RegisterUserUseCase } from '@/user/application/register-user.use-case';
import { User } from '@/user/domain';
import { UserUseCaseFactory, userUseCaseFactory } from '@/user/factories';
import { MemoryUserRepository, registerAction } from '@/user/infrastructure';
import { describe, expect, it, vi } from 'vitest';

describe(registerAction, () => {
  vi.spyOn(UserUseCaseFactory.prototype, 'createUseCases').mockImplementation(
    useCase => {
      return new useCase(MemoryUserRepository.getInstance());
    },
  );
  it('should return an error if the user object is invalid', async () => {
    const invalidUser = { name: '', email: '', password: '' } as User;

    const result = await registerAction(invalidUser);

    expect(result).toEqual({
      message: expect.any(String),
      error: true,
    });
  });

  it('should call RegisterUserUseCase.execute if the user is valid', async () => {
    const validUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123@@',
    } as User;

    const result = await registerAction(validUser);

    expect(userUseCaseFactory.createUseCases).toHaveBeenCalledWith(
      RegisterUserUseCase,
    );

    expect(result).toEqual({
      message: `${validUser.email} registered successfully!`,
      error: false,
    });
  });

  it('should return an error message if RegisterUserUseCase throws an error', async () => {
    const validUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123@@',
    } as User;

    const errorMessage = 'User already exists';
    await registerAction(validUser);
    const result = await registerAction(validUser);

    expect(result).toEqual({
      message: `Error: ${errorMessage}`,
      error: true,
    });
  });
});
