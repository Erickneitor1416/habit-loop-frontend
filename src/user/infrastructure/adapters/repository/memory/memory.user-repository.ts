import { User, UserRepository } from '@/user/domain';

export class MemoryUserRepository extends UserRepository {
  private readonly users: User[];
  public static instance: MemoryUserRepository;
  constructor() {
    super();
    this.users = [];
  }
  async findByEmail(userEmail: string): Promise<User | null> {
    const user = this.users.find(user => user.email === userEmail);
    if (!user) {
      return Promise.resolve(null);
    }
    return Promise.resolve(user);
  }
  async update(user: User): Promise<void> {
    const index = this.users.findIndex(u => u.email === user.email);
    this.users[index] = user;
  }
  public static getInstance(): MemoryUserRepository {
    if (!MemoryUserRepository.instance) {
      MemoryUserRepository.instance = new MemoryUserRepository();
    }
    return MemoryUserRepository.instance;
  }

  async save(user: User): Promise<User> {
    if (this.users.find(u => u.email === user.email)) {
      return Promise.reject(new Error('User already exists'));
    }
    this.users.push(user);
    return Promise.resolve(user);
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; user: User } | null> {
    const user = this.users.find(
      user => user.email === email && user.password === password,
    );
    if (!user) {
      return Promise.resolve(null);
    }
    return Promise.resolve({ accessToken: 'accessToken', user });
  }
}
