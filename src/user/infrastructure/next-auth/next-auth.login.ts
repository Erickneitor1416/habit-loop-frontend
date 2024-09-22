import { LoginUserUseCase } from '@/user/application';
import { LoginUser, User } from '@/user/domain';
import { userUseCaseFactory } from '@/user/factories';

const loginHandle = async (credentials: User) => {
  const parsed = LoginUser.safeParse(credentials);
  if (!parsed.success) {
    throw parsed.error.message;
  }

  const useCase = userUseCaseFactory.createUseCases(LoginUserUseCase);
  const authenticatedUser = await useCase.execute(parsed.data);

  if (!authenticatedUser) {
    return null;
  }

  const { accessToken, user } = authenticatedUser;
  return {
    ...user,
    accessToken,
    id: '',
  };
};

export { loginHandle };
