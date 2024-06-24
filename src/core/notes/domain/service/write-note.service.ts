import { EntitiesName } from '@/constants/entities';
import { PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive';
import { Messages } from '@/messages';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDTO } from '../dto/create-note';
import { UpdateNoteDTO } from '../dto/update-note';
import { Note } from '../note.entity';
import { NoteRepository } from '../note.repository';
import { ReadNoteService } from './read-note.service';

@Injectable()
export class WriteNoteService {
  constructor(
    @Inject('NoteRepository')
    private readonly noteRepository: NoteRepository,
    private readonly readNoteService: ReadNoteService,
  ) {}

  /* ---------- create ---------- */ // MARK: create
  public async create(
    sessionData: PayloadPrimitive,
    { idImage, title, content }: CreateNoteDTO,
  ): Promise<Note> {
    const image = null;

    if (idImage !== null && image === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.IMAGE));
    }

    const note = Note.create({
      idUser: sessionData.id,
      idImage,
      title,
      content,
    });

    return await this.noteRepository.create(note);
  }

  /* ---------- update ---------- */ // MARK: update
  public async update(
    sessionData: PayloadPrimitive,
    index: number,
    { idImage, title, content }: UpdateNoteDTO,
  ): Promise<Note> {
    const note = await this.readNoteService.findOne({
      idUser: sessionData.id,
      index,
    });

    if (!note) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.NOTE));
    }

    if (idImage !== undefined) {
      const image = null;

      if (image === null) {
        throw new NotFoundException(
          Messages.error.NotFound(EntitiesName.IMAGE),
        );
      }

      note.idImage = idImage;
    }
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    return await this.noteRepository.update(note);
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete(
    sessionData: PayloadPrimitive,
    index: number,
  ): Promise<void> {
    const note = await this.readNoteService.findOne({
      idUser: sessionData.id,
      index,
    });

    if (!note) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.NOTE));
    }

    await this.noteRepository.delete(note);
  }
}
