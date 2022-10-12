import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './../../user/user.model';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly ConfigService: ConfigService,
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: ConfigService.get('ACESS_TOKEN'),
      ignoreExpiration: false,
    });
  }

  async validate({ _id }: Pick<UserModel, '_id'>) {
    return await this.UserModel.findById(_id).exec();
  }
}
