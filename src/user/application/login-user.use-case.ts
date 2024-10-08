import { BaseUseCase } from '@/shared/base.use-case';
import { User, UserRepository } from '@/user/domain';

export class LoginUserUseCase extends BaseUseCase<UserRepository> {
  async execute(
    user: User,
  ): Promise<{ accessToken: string; user: User } | null> {
    return await this.repository.findByEmailAndPassword(
      user.email,
      user.password,
    );
  }
}
