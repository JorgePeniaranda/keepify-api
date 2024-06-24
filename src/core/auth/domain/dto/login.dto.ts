import { UserDTO } from '@/core/user/domain/user.dto'
import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'

const keys: Array<keyof UserDTO> = ['email', 'secret'] as const

export class LoginDTO extends PickType(UserDTO, keys) {}

export class SWGLoginDTO extends SWGPickType(UserDTO, keys) {}
