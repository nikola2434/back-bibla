import { IsEmail, MinLength } from 'class-validator';

export class authDto {
  @IsEmail()
  email: string;

  @MinLength(5, { message: 'Пароль должен быль больше 5 символов!' })
  password: string;
}
