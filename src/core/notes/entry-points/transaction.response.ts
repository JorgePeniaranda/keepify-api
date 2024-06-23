import { PickType } from '@nestjs/swagger';
import { NoteDTO } from '../domain/note.dto';

export class NoteResponse extends PickType(NoteDTO, [
  'id',
  'idUser',
  'idImage',
  'title',
  'content',
  'createdAt',
  'updatedAt',
]) {}
