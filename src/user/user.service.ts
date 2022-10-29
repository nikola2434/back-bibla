import { genSalt, hash } from 'bcryptjs';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { updateUser, updateImage } from './dto/updateUser.dto';
import { Types } from 'mongoose';

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

  async updateImage(id: Types.ObjectId, dto: updateImage) {
    const user = await this.UserModel.findByIdAndUpdate(
      id,
      { avatar: dto.url },
      { new: true },
    );
    return { user: user };
  }

  async updateUserAdmin(id: Types.ObjectId, isAdmin: boolean) {
    return this.UserModel.findByIdAndUpdate(
      id,
      { isAdmin: isAdmin },
      { new: true },
    );
  }

  async getAllUsers(searchTerm?: string) {
    let options = {};
    console.log(searchTerm);
    if (searchTerm) {
      options = {
        email: new RegExp(searchTerm, 'i'),
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

  async toggleFavorite(bookId: Types.ObjectId, user: UserModel) {
    const { _id, favoriteBooks } = user;

    return this.UserModel.findByIdAndUpdate(_id, {
      favoriteBooks: favoriteBooks.includes(bookId)
        ? favoriteBooks.filter((book) => book !== bookId)
        : [...favoriteBooks, bookId],
    });
  }

  async getFavoriteBooks(id: Types.ObjectId) {
    return await this.UserModel.findById(id, 'favoriteBooks')
      .populate('favoriteBooks')
      .exec();
  }
}
