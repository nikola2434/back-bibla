import { BooksModel } from './../books/books.model';

import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ default: false })
  isAdmin: boolean;

  @prop()
  avatar: string;

  @prop({ default: [], ref: () => BooksModel })
  favoriteBooks: Ref<BooksModel>[];
}
