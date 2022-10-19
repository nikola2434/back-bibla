import { UserModel } from './../../dist/user/user.model.d';
import { idValidationPipe } from './../pipes/idValidationPipe';
import { UserService } from './user.service';
import { Get, Put, Param, Body, Delete, Query } from '@nestjs/common';
import { Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';
import { User } from './deccorators/user.deccorator';
import { updateUser } from './dto/updateUser.dto';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return await this.UserService.byId(_id);
  }

  @Get('count')
  @Auth('admin')
  async getCountUsers() {
    return await this.UserService.getCountUser();
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @Auth()
  @HttpCode(200)
  async updateProfile(@User('_id') _id: string, @Body() dto: updateUser) {
    return await this.UserService.updateUser(_id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':_id')
  @Auth('admin')
  @HttpCode(200)
  async updateUser(
    @Param('_id', idValidationPipe) _id: string,
    @Body() dto: updateUser,
  ) {
    return await this.UserService.updateUser(_id, dto);
  }

  @Delete(':_id')
  @Auth('admin')
  async deleteUser(@Param('_id', idValidationPipe) _id: string) {
    return await this.UserService.delete(_id);
  }

  @Get()
  @Auth('admin')
  async getAllUsers(@Query('value') value?: string) {
    return await this.UserService.getAllUsers(value);
  }

  @Put('profile/:bookId')
  @Auth()
  @HttpCode(200)
  async toggleFavorite(
    @Param('bookId', idValidationPipe) bookId: Types.ObjectId,
    @User() user: UserModel,
  ) {
    return await this.UserService.toggleFavorite(bookId, user);
  }

  @Get('favorites')
  @Auth()
  async getFavorites(@User('_id') _id: Types.ObjectId) {
    return await this.UserService.getFavoriteBooks(_id);
  }
}
