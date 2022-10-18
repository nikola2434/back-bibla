import { IsString } from 'class-validator';

export class bookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  genre: string;

  @IsString()
  description?: string;

  @IsString()
  poster: string;
}
