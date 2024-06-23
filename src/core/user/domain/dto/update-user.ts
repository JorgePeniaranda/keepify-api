import { PickType } from '@nestjs/mapped-types';
import { PickType as SWGPickType } from '@nestjs/swagger';
import { UserDTO } from '../user.dto';

const keys: Array<keyof UserDTO> = ['secret'] as const;

export class UpdateUserDTO extends PickType(UserDTO, keys) {}

export class SWGUpdateUserDTO extends SWGPickType(UserDTO, keys) {}
