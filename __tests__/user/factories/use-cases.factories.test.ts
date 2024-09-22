import { UserRepository } from '@/user/domain';
import { UserUseCaseFactory } from '@/user/factories';
import { MemoryUserRepository } from '@/user/infrastructure';
import { beforeEach, describe, expect, it } from 'vitest';

describe(UserUseCaseFactory, () => {
  let userRepository: UserRepository;
  let userUseCaseFactory: UserUseCaseFactory;

  beforeEach(() => {
    userRepository = MemoryUserRepository.getInstance();
    userUseCaseFactory = new UserUseCaseFactory(userRepository);
  });

  it('should create an instance of UserUseCaseFactory', () => {
    expect(userUseCaseFactory).toBeInstanceOf(UserUseCaseFactory);
  });

  it('should return the same instance of UserUseCaseFactory', () => {
    const instance1 = UserUseCaseFactory.getInstance(userRepository);
    const instance2 = UserUseCaseFactory.getInstance(userRepository);
    expect(instance1).toBe(instance2);
  });

  it('should create an instance of a use case class', () => {
    class TestUseCase {
      constructor(public userRepository: UserRepository) {}
    }

    const useCase = userUseCaseFactory.createUseCases(TestUseCase);
    expect(useCase).toBeInstanceOf(TestUseCase);
    expect(useCase.userRepository).toBe(userRepository);
  });
});
