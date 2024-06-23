import { type User } from '@prisma/client';

export interface UserPrimitive {
  readonly id: User['id'];
  readonly email: User['email'];
  secret: User['secret'];
  readonly createdAt: User['createdAt'];
  updatedAt: User['updatedAt'];
}
