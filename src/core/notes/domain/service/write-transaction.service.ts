import {
  Inject,
  Injectable
} from '@nestjs/common'
import { Note } from '../note.entity'
import { NotePrimitive } from '../note.primitive'
import { NoteRepository } from '../note.repository'
import { ReadNoteService } from './read-note.service'
import { CreateNoteDTO } from '../dto/create-note'
import { UpdateNoteDTO } from '../dto/update-note'
import { Messages } from '@/messages'
import { EntitiesName } from '@/constants/entities'

@Injectable()
export class WriteNoteService {
  constructor (
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepository,
    private readonly readNoteService: ReadNoteService,
  ) {}

  /* ---------- create ---------- */ // MARK: create
  public async create ({
    idUser,
    idImage,
    title,
    content
  }: CreateNoteDTO): Promise<Note> {
    const note = Note.create({
      idUser,
      idImage,
      title,
      content,
    })
    
    return await this.noteRepository.create(note)
  }

  /* ---------- update ---------- */ // MARK: update
  public async update ({
    idUser,
    index,
  }: {
    idUser: NotePrimitive['idUser'],
    index: number
  }, {
    idImage,
    title,
    content,
  }: UpdateNoteDTO): Promise<Note> {
    const note = await this.readNoteService.findOne({
      idUser,
      index
    })

    if (!note) {
      throw new Error(Messages.error.NotFound(EntitiesName.NOTE))
    }

    if(idImage !== undefined) note.idImage = idImage
    if(title !== undefined) note.title = title
    if(content !== undefined) note.content = content

    return await this.noteRepository.update(note)
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete ({
    idUser,
    index
  }: {
    idUser: NotePrimitive['idUser']
    index: number
  }): Promise<void> {
    const note = await this.readNoteService.findOne({
      idUser,
      index
    })

    if (!note) {
      throw new Error(Messages.error.NotFound(EntitiesName.NOTE))
    }

    await this.noteRepository.delete(note)
  }
}
