import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
  async loginEmail(@Body() data: LoginDto) {
    return await this.authService.loginEmail(data);
  }

  @Post('refresh-token')
  @Public()
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@User('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  async logout(@User('userId') userId: number) {
    return await this.authService.logout(userId);
  }
}
