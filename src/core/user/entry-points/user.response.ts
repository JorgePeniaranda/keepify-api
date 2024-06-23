import { PickType } from '@nestjs/swagger';
import { UserDTO } from '../domain/user.dto';

export class UserResponse extends PickType(UserDTO, [
  'id',
  'email',
  'createdAt',
  'updatedAt',
]) {}
