import { PickType } from '@nestjs/mapped-types';
import { PickType as SWGPickType } from '@nestjs/swagger';
import { UserDTO } from '../user.dto';

const keys: Array<keyof UserDTO> = [
  'email',
  'secret'
] as const;

export class CreateUserDTO extends PickType(UserDTO, keys) {}

export class SWGCreateUserDTO extends SWGPickType(UserDTO, keys) {}
