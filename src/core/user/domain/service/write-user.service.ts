import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { ReadUserService } from './read-user.service';
import { CreateUserDTO } from '../dto/create-user';
import { UpdateUserDTO } from '../dto/update-user';
import { Messages } from '@/messages';
import { EntitiesName } from '@/constants/entities';
import { UserPrimitive } from '../user.primitive';

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
    {
      id,
    }: {
      id: UserPrimitive['id'];
    },
    { secret }: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.readUserService.findByID({
      id,
    });

    if (!user) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER));
    }

    if (secret !== undefined) user.secret = secret;

    return await this.userRepository.update(user);
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete({ id }: { id: UserPrimitive['id'] }): Promise<void> {
    const user = await this.readUserService.findByID({
      id,
    });

    if (!user) {
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.USER));
    }

    await this.userRepository.delete(user);
  }
}
