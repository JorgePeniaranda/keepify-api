import { EntitiesName } from '@/constants/entities';
import { Messages } from '@/messages';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReadNoteService } from '../domain/service/read-note.service';
import { WriteNoteService } from '../domain/service/write-transaction.service';
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator';
import { NoteResponse } from './transaction.response';
import { Note } from '../domain/note.entity';
import { CreateNoteDTO, SWGCreateNoteDTO } from '../domain/dto/create-note';
import { SWGUpdateNoteDTO, UpdateNoteDTO } from '../domain/dto/update-note';

@ApiTags('Note')
@Controller('notes')
export class NoteController {
  constructor(
    private readonly readNoteService: ReadNoteService,
    private readonly writeNoteService: WriteNoteService,
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  @ENDPOINT_INFO({
    auth: true,
    response: NoteResponse,
    isArray: true,
    status: 200,
  })
  @Get()
  async findAll(): Promise<Note[]> {
    return await this.readNoteService.findAll({
      idUser: '1',
    });
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  @ENDPOINT_INFO({
    auth: true,
    response: NoteResponse,
    status: 200,
  })
  @Get('/:index')
  async findOne(
    @Param('index', new ParseIntPipe()) index: number,
  ): Promise<Note> {
    const note = await this.readNoteService.findOne({
      idUser: '1',
      index,
    });

    if (note === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.NOTE));
    }

    return note;
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateNoteDTO,
    response: NoteResponse,
    status: 201,
  })
  @Post()
  async create(@Body() data: CreateNoteDTO): Promise<Note> {
    return await this.writeNoteService.create(data);
  }

  /* ---------- update ---------- */ // MARK: update
  @ENDPOINT_INFO({
    auth: true,
    body: SWGUpdateNoteDTO,
    response: NoteResponse,
    status: 204,
  })
  @Patch('/:index')
  async update(
    @Param('index', new ParseIntPipe()) index: number,
    @Body() data: UpdateNoteDTO,
  ): Promise<Note> {
    return await this.writeNoteService.update(
      {
        idUser: '1',
        index,
      },
      data,
    );
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204,
  })
  @Delete('/:index')
  async delete(
    @Param('index', new ParseIntPipe()) index: number,
  ): Promise<void> {
    await this.writeNoteService.delete({
      idUser: '1',
      index,
    });
  }
}
