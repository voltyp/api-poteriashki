import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import jwt_decode from 'jwt-decode';
import { Request, Response } from 'express';

import { LoginDto } from './dto/login.dto';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { JwtPayload, Tokens } from '@/modules/auth/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async generateJWT(user: any): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId: user.id,
          role: user.role,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          userId: user.id,
          role: user.role,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await argon.hash(refreshToken);
    await this.userRepository.update(userId, { hashedRt: hash });
  }

  storeTokenInCookie(
    res: Response,
    authToken: { accessToken: string; refreshToken: string },
  ) {
    res.cookie('access_token', authToken.accessToken, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
    });
    res.cookie('refresh_token', authToken.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  }

  async refreshToken(req: Request): Promise<Tokens> {
    const { userId: id }: JwtPayload = jwt_decode(req.cookies.refresh_token);

    const user = await this.userRepository.findOneBy({ id });

    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Доступ запрещен');
    }

    const refreshTokenMatches = await argon.verify(
      user.hashedRt.toString(),
      req.cookies.refresh_token,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Доступ запрещен');
    }

    const tokens = await this.generateJWT(user);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }
  async loginEmail({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        'Неверно введен email или пароль',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await argon.verify(
      user.password.toString(),
      password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Неверно введен email или пароль',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const tokens = await this.generateJWT(user);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async logout(userId: number): Promise<boolean> {
    await this.userRepository.update(userId, { hashedRt: null });
    return true;
  }
}
