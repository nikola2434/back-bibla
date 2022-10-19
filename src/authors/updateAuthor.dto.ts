import { IsArray, IsString } from 'class-validator';

export class updateAuthor {
  @IsString()
  nameAuthor: string;

  @IsString()
  country: string;

  @IsString()
  DateOfBirth: string;

  @IsString()
  avatar: string;

  @IsArray()
  @IsString()
  BooksWritten: [];
}
