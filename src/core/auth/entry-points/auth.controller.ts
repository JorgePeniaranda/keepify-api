import { type User } from '@/core/user/domain/user.entity';
import { ENDPOINT_INFO } from '@/decorators/endpoint.decorator';
import { LocalAuthGuard } from '@/guard/auth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWGLoginDTO } from '../domain/dto/login.dto';
import { type PayloadPrimitive } from '../domain/primitive/payload.primitive';
import { AuthService } from '../domain/service/auth.service';
import { type Token } from '../domain/token.entity';
import { JWTResponse } from './session.response';
import { TokenResponse } from './token.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* ---------- login ---------- */ // MARK: login
  @ENDPOINT_INFO({
    auth: false,
    body: SWGLoginDTO,
    response: TokenResponse,
    status: 200,
  })
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req: { user: User }): Promise<Token> {
    return await this.authService.login(req.user);
  }

  /* ---------- verify ---------- */ // MARK: verify
  @ENDPOINT_INFO({
    auth: true,
    response: JWTResponse,
    status: 204,
  })
  @Get()
  async verify(
    @Request() req: { user: PayloadPrimitive },
  ): Promise<PayloadPrimitive> {
    return req.user;
  }
}
