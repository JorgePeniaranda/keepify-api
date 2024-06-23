import { type Note } from './note.entity';
import { type NotePrimitive } from './note.primitive';

export interface NoteRepository {
  create: (data: Note) => Promise<Note>;
  findAll: ({
    idUser,
    skip,
    take,
  }: {
    idUser: NotePrimitive['idUser'];
    skip: number;
    take: number;
  }) => Promise<Note[]>;
  findOne: ({
    idUser,
    index,
  }: {
    idUser: NotePrimitive['idUser'];
    index: number;
  }) => Promise<Note | null>;
  findByID: (id: NotePrimitive['id']) => Promise<Note | null>;
  delete: (id: Note) => Promise<Note>;
}