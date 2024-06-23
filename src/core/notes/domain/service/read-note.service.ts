import { Inject, Injectable } from '@nestjs/common'
import { type Note } from '../note.entity'
import { type NotePrimitive } from '../note.primitive'
import { NoteRepository } from '../note.repository'

@Injectable()
export class ReadNoteService {
  constructor (
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepository,
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({
    idUser,
    skip,
    take
  }: {
    idUser: NotePrimitive['idUser']
    skip?: number
    take?: number
  }): Promise<Note[]> {
    return await this.noteRepository.findAll({idUser,skip,
      take})
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    index
  }: {
    idUser: Note['idUser']
    index: number
  }): Promise<Note | null> {
    return await this.noteRepository.findOne({idUser,
      index
    })
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID ({ id }: { id: NotePrimitive['id'] }): Promise<Note | null> {
    return await this.noteRepository.findByID({id})
  }
}
