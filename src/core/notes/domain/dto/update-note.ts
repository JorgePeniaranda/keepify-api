import { PickType } from '@nestjs/mapped-types'
import { PickType as SWGPickType } from '@nestjs/swagger'
import { NoteDTO } from '../note.dto'

const keys: Array<keyof NoteDTO> = ['idImage', 'title', 'content'] as const

export class UpdateNoteDTO extends PickType(NoteDTO, keys) {}

export class SWGUpdateNoteDTO extends SWGPickType(NoteDTO, keys) {}
