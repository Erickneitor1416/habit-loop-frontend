'use server';
import { RegisterUserUseCase } from '@/user/application/register-user.use-case';
import { RegisterUser, User } from '@/user/domain';
import { userUseCaseFactory } from '@/user/factories/use-cases.factories';

const registerAction = (user: User): boolean => {
  const parsed = RegisterUser.safeParse(user);
  if (!parsed.success) return parsed.success;
  userUseCaseFactory
    .createUseCases(RegisterUserUseCase)
    .execute(
      new User(parsed.data.name, parsed.data.email, parsed.data.password),
    );
  return true;
};
export { registerAction };
