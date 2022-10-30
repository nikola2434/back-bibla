import { UserModel } from './user.model';
import { idValidationPipe } from './../pipes/idValidationPipe';
import { UserService } from './user.service';
import { Get, Put, Param, Body, Delete, Query } from '@nestjs/common';
import { Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';
import { User } from './deccorators/user.deccorator';
import { updateUser, updateImage } from './dto/updateUser.dto';
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

  @Get('favorites')
  @Auth()
  async getFavorites(@User('_id') _id: Types.ObjectId) {
    return await this.UserService.getFavoriteBooks(_id);
  }

  @Get(':id')
  @Auth('admin')
  async getUserById(@Param('id') id: string) {
    return await this.UserService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @Auth()
  @HttpCode(200)
  async updateProfile(@User('_id') _id: string, @Body() dto: updateUser) {
    return await this.UserService.updateUser(_id, dto);
  }

  @Put('profile/image')
  @Auth()
  @HttpCode(200)
  async updateImage(
    @User('_id') _id: Types.ObjectId,
    @Body() dto: updateImage,
  ) {
    return await this.UserService.updateImage(_id, dto);
  }

  @Put('admin/:id')
  @Auth('admin')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateAdminUSer(
    @Param('id', idValidationPipe) id: Types.ObjectId,
    @Body() dto: { isAdmin: boolean },
  ) {
    return await this.UserService.updateUserAdmin(id, dto.isAdmin);
  }

  @Delete(':_id')
  @Auth('admin')
  async deleteUser(@Param('_id', idValidationPipe) _id: string) {
    return await this.UserService.delete(_id);
  }

  @Get()
  @Auth('admin')
  async getAllUsers(@Query('searchTerm') searchTerm?: string) {
    return await this.UserService.getAllUsers(searchTerm);
  }

  @Put('favorite/:bookId')
  @Auth()
  @HttpCode(200)
  async toggleFavorite(
    @Param('bookId', idValidationPipe) bookId: Types.ObjectId,
    @User() user: UserModel,
  ) {
    return await this.UserService.toggleFavorite(bookId, user);
  }
}
