import { IsString } from 'class-validator';

export class updateGenre {
  @IsString()
  title?: string;

  @IsString()
  link?: string;

  @IsString()
  icons?: string;

  books?: [];

  @IsString()
  description?: string;
}
