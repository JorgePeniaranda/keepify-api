import { EntitiesName } from '@/constants/entities';
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator';
import { Messages } from '@/messages';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, SWGCreateUserDTO } from '../domain/dto/create-user';
import { SWGUpdateUserDTO, UpdateUserDTO } from '../domain/dto/update-user';
import { ReadUserService } from '../domain/service/read-user.service';
import { WriteUserService } from '../domain/service/write-user.service';
import { User } from '../domain/user.entity';
import { UserResponse } from './user.response';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { JwtPayload } from '@/core/auth/domain/payload.entity';

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
  async getInfo(@CurrentUser() User: JwtPayload): Promise<User> {
    const note = await this.readNoteService.findByID({
      id: User.id,
    });

    if (note === null) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER));
    }

    return note;
  }

  /* ---------- create ---------- */ // MARK: create
  @ENDPOINT_INFO({
    auth: false,
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
    status: 200,
  })
  @Patch()
  async update(
    @CurrentUser() User: JwtPayload,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return await this.writeNoteService.update(
      {
        id: User.id,
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
  async delete(@CurrentUser() User: JwtPayload): Promise<void> {
    await this.writeNoteService.delete({
      id: User.id,
    });
  }
}
