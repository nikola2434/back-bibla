import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface BooksModel extends Base {}

export class BooksModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  author: string;

  @prop({ required: true })
  genre: string;

  @prop()
  description: string;

  @prop({ default: 4.0 })
  rating: number;

  @prop({ required: true })
  poster: string;
}
