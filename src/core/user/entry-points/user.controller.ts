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
import { ReadUserService } from '../domain/service/read-user.service';
import { WriteUserService } from '../domain/service/write-user.service';
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator';
import { UserResponse } from './user.response';
import { User } from '../domain/user.entity';
import { CreateUserDTO, SWGCreateUserDTO } from '../domain/dto/create-user';
import { SWGUpdateUserDTO, UpdateUserDTO } from '../domain/dto/update-user';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly readNoteService: ReadUserService,
    private readonly writeNoteService: WriteUserService,
  ) {}


  /* ---------- getInfo ---------- */ // MARK: getInfo
  @ENDPOINT_INFO({
    auth: true,
    response: UserResponse,
    status: 200,
  })
  @Get()
  async getInfo(
  ): Promise<User> {
    const note = await this.readNoteService.findByID({
      id: '1',
    });

    if (note === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER));
    }

    return note;
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: true,
    body: SWGCreateUserDTO,
    response: UserResponse,
    status: 201,
  })
  @Post()
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return await this.writeNoteService.create(data);
  }

  /* ---------- update ---------- */ // MARK: update
  @ENDPOINT_INFO({
    auth: true,
    body: SWGUpdateUserDTO,
    response: UserResponse,
    status: 204,
  })
  @Patch()
  async update(
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return await this.writeNoteService.update(
      {
        id: '1',
      },
      data,
    );
  }

  /* ---------- delete ---------- */ // MARK: delete
  @ENDPOINT_INFO({
    auth: true,
    status: 204,
  })
  @Delete()
  async delete(
  ): Promise<void> {
    await this.writeNoteService.delete({
      id: '1',
    });
  }
}
