import { User, UserRepository } from '@/user/domain';
import { BaseUseCase } from '../../shared/base.use-case';

export class RegisterUserUseCase extends BaseUseCase<UserRepository> {
  async execute(user: User): Promise<User | null> {
    return await this.repository.save(user);
  }
}
