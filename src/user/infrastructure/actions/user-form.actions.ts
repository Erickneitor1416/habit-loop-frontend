'use server';
import { RegisterUserUseCase } from '@/user/application/register-user.use-case';
import { RegisterUser, User } from '@/user/domain';
import { userUseCaseFactory } from '@/user/factories';
import { Result } from '../types/result';

const registerAction = async (user: User): Promise<Result> => {
  const parsed = RegisterUser.safeParse(user);

  if (!parsed.success) {
    return { message: parsed.error.message, error: true };
  }

  try {
    const useCase = userUseCaseFactory.createUseCases(RegisterUserUseCase);
    const registeredUser = await useCase.execute(parsed.data);
    return {
      message: `${registeredUser?.email} registered successfully!`,
      error: false,
    };
  } catch (error) {
    return { message: `Error: ${(error as Error).message}`, error: true };
  }
};

export { registerAction };
