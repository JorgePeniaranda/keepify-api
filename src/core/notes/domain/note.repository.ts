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
    skip?: number;
    take?: number;
  }) => Promise<Note[]>;
  findByID: ({ id }: { id: NotePrimitive['id'] }) => Promise<Note | null>;
  update: (data: Note) => Promise<Note>;
  delete: (data: Note) => Promise<void>;
}
