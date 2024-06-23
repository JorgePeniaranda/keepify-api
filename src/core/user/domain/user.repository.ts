import { type User } from './user.entity';
import { type UserPrimitive } from './user.primitive';

export interface UserRepository {
  create: (data: User) => Promise<User>;
  findByID: ({ id }: { id: UserPrimitive['id'] }) => Promise<User | null>;
  update: (data: User) => Promise<User>;
  delete: (data: User) => Promise<void>;
}
