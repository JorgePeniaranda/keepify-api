import { ReadUserService } from '@/core/user/domain/service/read-user.service';
import { type User } from '@/core/user/domain/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../payload.entity';
import { Token } from '../token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly readUserService: ReadUserService,
    private readonly jwtService: JwtService,
  ) {}

  /* ---------- validateUser ---------- */ // MARK: validateUser
  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.readUserService.findByEmail({ email });

    if (user !== null && user.comparePassword(password)) {
      return user;
    }

    return null;
  }

  /* ---------- login ---------- */ // MARK: login
  public async login(user: User): Promise<Token> {
    const payload = new JwtPayload({ id: user.id });
    const jwt = this.jwtService.sign(payload.toJSON(), {
      subject: user.id.toString(),
    });

    const token = new Token(jwt);

    return token;
  }
}
