import { BooksModel } from '../books/books.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface AuthorsModel extends Base {}

export class AuthorsModel extends TimeStamps {
  @prop({ required: true })
  nameAuthor: string;

  @prop({ required: true })
  country: string;

  @prop({ required: true })
  DateOfBirth: string;

  @prop({
    required: true,
  })
  avatar: string;

  @prop({ ref: () => BooksModel })
  BooksWritten: Ref<BooksModel>[];
}
