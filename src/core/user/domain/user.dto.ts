import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsString,
  MaxDate,
  MaxLength
} from 'class-validator';
import { type UserPrimitive } from './user.primitive';

export class UserDTO implements UserPrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 'c39eb602-b1cd-4e3e-9b12-48cc05577715',
    type: String,
  })
  @IsString()
  id: UserPrimitive['id'];

  /* ---------- EMAIL ---------- */
  @ApiProperty({
    example: 'example@email.com',
    type: String,
  })
  @IsString()
  email: UserPrimitive['email'];

  /* ---------- SECRET ---------- */
  @ApiProperty({
    example: '^2k658E2^Vr%5v*9R*F$#F@Ft75&@82^',
    type: String,
  })
  @IsString()
  @MaxLength(2000)
  secret: UserPrimitive['secret'];

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date,
  })
  @IsDate()
  @MaxDate(new Date())
  createdAt: UserPrimitive['createdAt'];

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date,
  })
  @IsDate()
  @MaxDate(new Date())
  updatedAt: UserPrimitive['updatedAt'];
}
