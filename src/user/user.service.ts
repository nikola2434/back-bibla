import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}

  async byId(_id: string) {
    const user = await this.UserModel.findById(_id);
    if (!user) throw new NotFoundException('Пользователь не найден!');
    return user;
  }
}
