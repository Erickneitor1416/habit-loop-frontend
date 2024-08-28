import { User, UserRepository } from '@/user/domain';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User | null> {
    return await this.userRepository.save(user);
  }
}
