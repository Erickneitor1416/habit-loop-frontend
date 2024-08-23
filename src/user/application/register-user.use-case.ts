import { User } from '../domain';
import { UserRepository } from '../domain/repository';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User | null> {
    return await this.userRepository.save(user);
  }
}
