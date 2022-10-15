import { refreshTokenDto } from './dto/refreshTokenDto.dto';
import { authDto } from './dto/authDto.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: authDto) {
    return this.AuthService.register(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('access-token')
  async getAccessToken(@Body() dto: refreshTokenDto) {
    return this.AuthService.getNewTokens(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: authDto) {
    return this.AuthService.login(dto);
  }
}
