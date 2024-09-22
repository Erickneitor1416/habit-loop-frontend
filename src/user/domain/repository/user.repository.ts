import { User } from '@/user/domain';

export abstract class UserRepository {
  abstract save(user: User): Promise<User | null>;
  abstract findByEmail(userEmail: string): Promise<User | null>;
  abstract update(user: User): Promise<void>;
  abstract findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; user: User } | null>;
}
