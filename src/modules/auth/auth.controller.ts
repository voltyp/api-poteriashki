import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

import { Public, User } from '@/common/decorators';
import { RefreshTokenGuard } from '@/common/guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post()
  async loginEmail(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.loginEmail(data);
    this.authService.storeTokenInCookie(res, tokens);
    return user;
  }

  @Post('refresh-token')
  @Public()
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshToken(req);
    this.authService.storeTokenInCookie(res, tokens);
    return { message: 'OK' };
  }

  @Post('logout')
  async logout(@User('userId') userId: number) {
    return await this.authService.logout(userId);
  }
}
