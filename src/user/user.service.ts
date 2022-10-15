import { genSalt, hash } from 'bcryptjs';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { updateUser } from './dto/updateUser.dto';

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

  async updateUser(id: string, dto: updateUser) {
    const user = await this.byId(id);
    const summerUser = await this.UserModel.findOne({ email: dto.email });

    if (summerUser && summerUser._id !== user._id)
      throw new NotFoundException('Такой email уже существует!');

    if (dto.password) {
      const salt = await genSalt(10);
      user.password = await hash(dto.password, salt);
    }

    user.email = dto.email;
    if (dto.isAdmin || dto.isAdmin === false) {
      user.isAdmin = dto.isAdmin;
    }
    await user.save();

    return user;
  }

  async getAllUsers(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [{ email: new RegExp(searchTerm, 'i') }],
      };
    }
    return await this.UserModel.find(options)
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }

  async delete(id: string) {
    return await this.UserModel.findByIdAndDelete(id).exec();
  }

  async getCountUser() {
    return await this.UserModel.find().count().exec();
  }
}
