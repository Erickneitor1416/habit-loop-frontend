import { User, UserRepository } from '@/user/domain';
import { BaseUseCase } from './base.use-case';

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
