import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
} from 'class-validator';
import { type NotePrimitive } from './note.primitive';

export class NoteDTO implements NotePrimitive {
  /* ---------- ID ---------- */
  @ApiProperty({
    example: 'c39eb602-b1cd-4e3e-9b12-48cc05577715',
    type: String,
  })
  @IsString()
  id: NotePrimitive['id'];
  /* ---------- ID USER ---------- */
  @ApiProperty({
    example: 'c39eb602-b1cd-4e3e-9b12-48cc05577715',
    type: String,
  })
  @IsString()
  idUser: NotePrimitive['idUser'];
  /* ---------- ID IMAGE ---------- */
  @ApiProperty({
    example: 'c39eb602-b1cd-4e3e-9b12-48cc05577715',
    type: String,
  })
  @IsString()
  @IsOptional()
  idImage: NotePrimitive['idImage'];

  /* ---------- TITLE ---------- */
  @ApiProperty({
    example: 'Lorem ipsum:',
    type: String,
  })
  @IsString()
  @MaxLength(2000)
  @IsOptional()
  title: NotePrimitive['title'];

  /* ---------- CONTENT ---------- */
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: String,
  })
  @IsString()
  @MaxLength(2000)
  @IsOptional()
  content: NotePrimitive['content'];

  /* ---------- CREATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date,
  })
  @IsDate()
  @MaxDate(new Date())
  createdAt: NotePrimitive['createdAt'];

  /* ---------- UPDATED AT ---------- */
  @ApiProperty({
    example: new Date(),
    type: Date,
  })
  @IsDate()
  @MaxDate(new Date())
  updatedAt: NotePrimitive['updatedAt'];
}
