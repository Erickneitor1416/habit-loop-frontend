import { User } from '@/user/domain';
import { MemoryUserRepository } from '@/user/infrastructure/adapters/repository/memory/memory.user-repository';
import { describe, expect, it } from 'vitest';

describe('MemoryUserRepository', () => {
  it('findById should return null if user is not found', async () => {
    const repository = new MemoryUserRepository();
    const result = await repository.findById('nonexistent-id');
    expect(result).toBeNull();
  });

  it('findById should return the user if found', async () => {
    const repository = new MemoryUserRepository();
    const user: User = {
      id: 'user-id',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    repository.save(user);
    const result = await repository.findById('user-id');
    expect(result).toEqual(user);
  });

  it('update should update the user', async () => {
    const repository = new MemoryUserRepository();
    const user: User = {
      id: 'user-id',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    repository.save(user);
    const updatedUser: User = {
      id: 'user-id',
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
    };
    await repository.update(updatedUser);
    const result = await repository.findById('user-id');
    expect(result).toEqual(updatedUser);
  });

  it('save should reject if user with the same email already exists', async () => {
    const repository = new MemoryUserRepository();
    const user: User = {
      id: 'user-id',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    repository.save(user);
    const duplicateUser: User = {
      id: 'user-id-2',
      name: 'Jane Doe',
      email: 'john@example.com',
      password: 'password',
    };
    try {
      await repository.save(duplicateUser);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('findByEmail should return null if user is not found', async () => {
    const repository = new MemoryUserRepository();
    const result = await repository.findByEmailAndPassword(
      'nonexistent@example.com',
      'password',
    );
    expect(result).toBeNull();
  });

  it('findByEmail should return the user if found', async () => {
    const repository = new MemoryUserRepository();
    const user: User = {
      id: 'user-id',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    };
    repository.save(user);
    const result = await repository.findByEmailAndPassword(
      'john@example.com',
      'password',
    );
    expect(result).toEqual(user);
  });
});
