import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../domain/note.repository';
import { Note } from '../domain/note.entity';
import { PrismaService } from '@/service/prisma.service';

@Injectable()
export class NoteRepositoryPrisma implements NoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create
  public async create(data: Note): Promise<Note> {
    const note = await this.prisma.note.create({
      data: {
        id: undefined,
        idUser: data.idUser,
        idImage: data.idImage,
        title: data.title,
        content: data.content,
      },
    });

    return new Note(note);
  }

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll({
    idUser,
    skip,
    take,
  }: {
    idUser: Note['idUser'];
    skip?: number;
    take?: number;
  }): Promise<Note[]> {
    const notes = await this.prisma.note.findMany({
      where: {
        idUser,
      },
      skip,
      take,
    });

    return notes.map((note) => new Note(note));
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID({ id }: { id: Note['id'] }): Promise<Note | null> {
    const note = await this.prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (note === null) {
      return null;
    }

    return new Note(note);
  }

  /* ---------- update ---------- */ // MARK: update
  public async update(data: Note): Promise<Note> {
    const note = await this.prisma.note.update({
      where: {
        id: data.id,
      },
      data: {
        idImage: data.idImage,
        title: data.title,
        content: data.content,
      },
    });

    return new Note(note);
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete(data: Note): Promise<void> {
    await this.prisma.note.delete({
      where: {
        id: data.id,
      },
    });
  }
}
