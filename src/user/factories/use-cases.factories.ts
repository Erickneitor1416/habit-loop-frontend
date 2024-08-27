import { UserRepository } from '../domain';
import { HabitApiUserRepository } from '../infrastructure/adapters/repository/habit-api/habit-api.user-repository';

export class UserUseCaseFactory {
  private static instance: UserUseCaseFactory;
  private readonly userRepository: UserRepository =
    new HabitApiUserRepository();

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserUseCaseFactory();
    }
    return this.instance;
  }

  public createUseCases<T>(
    useCaseClass: new (userRepository: UserRepository) => T,
  ): T {
    return new useCaseClass(this.userRepository);
  }
}
export const userUseCaseFactory = UserUseCaseFactory.getInstance();
