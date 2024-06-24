import { Inject, Injectable } from '@nestjs/common';
import { type User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { UserPrimitive } from '../user.primitive';

@Injectable()
export class ReadUserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID({
    id,
  }: {
    id: UserPrimitive['id'];
  }): Promise<User | null> {
    return await this.userRepository.findByID({ id });
  }

  /* ---------- findByEmail ---------- */ // MARK: findByEmail
  public async findByEmail({
    email,
  }: {
    email: UserPrimitive['email'];
  }): Promise<User | null> {
    return await this.userRepository.findByEmail({ email });
  }
}
