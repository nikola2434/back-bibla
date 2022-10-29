import { IsString } from 'class-validator';

export class SlidersDto {
  @IsString()
  poster: string;

  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  link: string;
}
