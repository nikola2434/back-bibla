import { IsEmail } from 'class-validator';

export class updateUser {
  @IsEmail()
  email: string;

  password?: string;

  isAdmin?: boolean;
}
