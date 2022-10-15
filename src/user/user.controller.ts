import { UserService } from './user.service';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';
import { User } from './deccorators/user.deccorator';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@User('_id') _id: string) {
    return await this.UserService.byId(_id);
  }
}
