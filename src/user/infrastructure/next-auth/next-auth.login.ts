import { LoginUserUseCase } from '@/user/application/login-user.use-case';
import { LoginUser, User } from '@/user/domain';
import { userUseCaseFactory } from '@/user/factories';
import { signIn } from 'next-auth/react';
import router from 'next/router';
import { Result } from '../types/result';

const login = async (email: string, password: string) => {
  const responseNextAuth = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });
  if (responseNextAuth?.error) {
    return;
  }

  router.push('/dashboard');
};

const loginHandle = async (user: User): Promise<Result> => {
  const parsed = LoginUser.safeParse(user);

  if (!parsed.success) {
    return { message: parsed.error.message, error: true };
  }

  const { email, password } = parsed.data;

  try {
    const useCase = userUseCaseFactory.createUseCases(LoginUserUseCase);
    const authenticatedUser = await useCase.execute(new User(email, password));

    return {
      message: `${authenticatedUser?.email} logged successfully!`,
      error: false,
    };
  } catch (error) {
    return { message: `Error: ${(error as Error).message}`, error: true };
  }
};

export { loginHandle };
