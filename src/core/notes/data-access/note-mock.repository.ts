import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../domain/note.repository';
import { Note } from '../domain/note.entity';

@Injectable()
export class NoteRepositoryMock implements NoteRepository {
  /* ---------- create ---------- */ // MARK: create
  public async create(data: Note): Promise<Note> {
    return data;
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
    return [];
  }
  
  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne({
    idUser,
    index,
  }: {
    idUser: Note['idUser'];
    index: number;
  }): Promise<Note | null> {
    return null;
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID({ id }: { id: Note['id'] }): Promise<Note | null> {
    return null;
  }

  /* ---------- update ---------- */ // MARK: update
  public async update(data: Note): Promise<Note> {
    return data;
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete(data: Note): Promise<void> {
  }
}
