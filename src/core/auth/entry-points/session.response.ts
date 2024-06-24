import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { type PayloadPrimitive } from '../domain/primitive/payload.primitive';

export class JWTResponse {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  @IsString()
  @Expose()
  readonly id: PayloadPrimitive['id'];
}
