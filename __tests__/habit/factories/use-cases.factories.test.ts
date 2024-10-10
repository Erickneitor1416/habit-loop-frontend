import { HabitRepository } from '@/habit/domain';
import { HabitUseCaseFactory } from '@/habit/factories';
import { MemoryHabitRepository } from '@/habit/infrastructure';
import { beforeEach, describe, expect, it } from 'vitest';

describe(HabitUseCaseFactory, () => {
  let habitRepository: HabitRepository;
  let habitUseCaseFactory: HabitUseCaseFactory;

  beforeEach(() => {
    habitRepository = MemoryHabitRepository.getInstance();
    habitUseCaseFactory = new HabitUseCaseFactory(habitRepository);
  });

  it('should create an instance of HabitUseCaseFactory', () => {
    expect(habitUseCaseFactory).toBeInstanceOf(HabitUseCaseFactory);
  });

  it('should return the same instance of HabitUseCaseFactory', () => {
    const instance1 = HabitUseCaseFactory.getInstance(habitRepository);
    const instance2 = HabitUseCaseFactory.getInstance(habitRepository);
    expect(instance1).toBe(instance2);
  });

  it('should create an instance of a use case class', () => {
    class TestUseCase {
      constructor(public habitRepository: HabitRepository) {}
    }
    const useCase = habitUseCaseFactory.createUseCases(TestUseCase);
    expect(useCase).toBeInstanceOf(TestUseCase);
    expect(useCase.habitRepository).toBe(habitRepository);
  });
});
