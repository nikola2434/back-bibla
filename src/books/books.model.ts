import { GenreModel } from './../genre/genreModel';
import { AuthorsModel } from './../authors/authorsModel';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, Ref } from '@typegoose/typegoose';

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

  @prop({ default: 0 })
  count: number;
}
