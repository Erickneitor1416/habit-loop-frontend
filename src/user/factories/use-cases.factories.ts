import { UserRepository } from '@/user/domain';
import { HabitApiUserRepository } from '@/user/infrastructure';

export class UserUseCaseFactory {
  private static instance: UserUseCaseFactory;
  private readonly userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  public static getInstance(repository: UserRepository) {
    if (!this.instance) {
      this.instance = new UserUseCaseFactory(repository);
    }
    return this.instance;
  }

  public createUseCases<T>(
    useCaseClass: new (userRepository: UserRepository) => T,
  ): T {
    return new useCaseClass(this.userRepository);
  }
}
export const userUseCaseFactory = UserUseCaseFactory.getInstance(
  new HabitApiUserRepository(),
);
