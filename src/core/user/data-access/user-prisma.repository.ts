import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { PrismaService } from '@/service/prisma.service';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create
  public async create(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        id: undefined,
        email: data.email,
        secret: data.secret,
      },
    });

    return new User(user);
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID({ id }: { id: User['id'] }): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user === null) {
      return null;
    }

    return new User(user);
  }

  /* ---------- findByEmail ---------- */ // MARK: findByEmail
  public async findByEmail({
    email,
  }: {
    email: User['email'];
  }): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      return null;
    }

    return new User(user);
  }

  /* ---------- update ---------- */ // MARK: update
  public async update(data: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });

    return new User(user);
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete(data: User): Promise<void> {
    await this.prisma.note.deleteMany({
      where: {
        idUser: data.id,
      },
    });

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    });
  }
}
