import { BooksModel } from './../books/books.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
// @ts-ignore
export interface GenreModel extends Base {}

export class GenreModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  link: string;

  @prop({ required: true })
  icons: string;

  @prop({ ref: () => BooksModel, required: true })
  books: Ref<BooksModel>[];

  @prop({ default: '' })
  description?: string;
}
