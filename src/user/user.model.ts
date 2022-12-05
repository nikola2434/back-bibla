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

  @prop({
    default:
      'http://localhost:5000/uploads/test/misterwives-connect-the-dots-music-paper-graphics-hummingbird-2-3-png-clip-art.png',
  })
  avatar: string;

  @prop({ default: [], ref: () => BooksModel })
  favoriteBooks: Ref<BooksModel>[];
}
