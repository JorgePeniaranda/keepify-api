import { EntitiesName } from '@/constants/entities';
import { PayloadPrimitive } from '@/core/auth/domain/primitive/payload.primitive';
import { Messages } from '@/messages';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user';
import { UpdateUserDTO } from '../dto/update-user';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { ReadUserService } from './read-user.service';

@Injectable()
export class WriteUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly readUserService: ReadUserService,
  ) {}

  /* ---------- create ---------- */ // MARK: create
  public async create({ email, secret }: CreateUserDTO): Promise<User> {
    const userExists = await this.readUserService.findByEmail({
      email,
    });

    if (userExists) {
      throw new NotFoundException(
        Messages.error.AlreadyExist(EntitiesName.USER),
      );
    }

    const user = User.create({
      email,
      secret,
    });

    return await this.userRepository.create(user);
  }

  /* ---------- update ---------- */ // MARK: update
  public async update(
    sessionData: PayloadPrimitive,
    { secret }: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.readUserService.findByID({
      id: sessionData.id,
    });

    if (!user) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER));
    }

    if (secret !== undefined) user.secret = secret;

    return await this.userRepository.update(user);
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete(sessionData: PayloadPrimitive): Promise<void> {
    const user = await this.readUserService.findByID({
      id: sessionData.id,
    });

    if (!user) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER));
    }

    await this.userRepository.delete(user);
  }
}
