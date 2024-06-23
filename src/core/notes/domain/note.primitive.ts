import { type Note } from '@prisma/client';

export interface NotePrimitive {
  readonly id: Note['id'];
  readonly idUser: Note['idUser'];
  idImage?: Note['idImage'];
  title?: Note['title'];
  content?: Note['content'];
  readonly createdAt: Note['createdAt'];
  updatedAt: Note['updatedAt'];
}
