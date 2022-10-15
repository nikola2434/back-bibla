import { refreshTokenDto } from './dto/refreshTokenDto.dto';
import { authDto } from './dto/authDto.dto';
import { UserModel } from './../user/user.model';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { hash, genSalt, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly JwtService: JwtService,
  ) {}

  async login(dto: authDto) {
    const user = await this.UserModel.findOne({ email: dto.email });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден!');
    }
    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Не верный email или пароль!');
    }
    const tokens = await this.getTokens(String(user._id));
    return { user, ...tokens };
  }

  async getNewTokens(dto: refreshTokenDto) {
    if (!dto.refreshToken)
      throw new UnauthorizedException('Войдите в систему!');
    const result = await this.JwtService.verifyAsync(dto.refreshToken);
    if (!result) throw new UnauthorizedException('Не верный токен!');
    const user = await this.UserModel.findById(result._id);

    const tokens = await this.getTokens(String(user._id));

    return {
      user,
      ...tokens,
    };
  }

  async register({ email, password }: authDto) {
    const oldUser = await this.UserModel.findOne({ email });
    if (oldUser) {
      throw new BadRequestException('Этот пользователь уже зарегистрирован!');
    }
    const salt = await genSalt(10);
    const newUser = new this.UserModel({
      email,
      password: await hash(password, salt),
    });
    const user = await newUser.save();

    const tokens = await this.getTokens(String(user._id));

    return {
      user,
      ...tokens,
    };
  }

  async getTokens(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.JwtService.signAsync(data, {
      expiresIn: '10d',
    });

    const assetToken = await this.JwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, assetToken };
  }
}
