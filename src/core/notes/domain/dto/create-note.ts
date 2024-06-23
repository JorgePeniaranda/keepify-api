import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { NoteDTO } from '../note.dto'

const keys: Array<keyof NoteDTO> = ['idUser', 'idImage', 'title', 'content'] as const

export class CreateNoteDTO extends PickType(NoteDTO, keys) {}

export class SWGCreateNoteDTO extends SWGPickType(NoteDTO, keys) {}
