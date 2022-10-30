import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { BooksModel } from 'src/books/books.model';

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
  @prop({ required: true })
  userId: Types.ObjectId;

  @prop({ required: true, ref: () => BooksModel })
  bookId: Ref<BooksModel>;

  @prop({ max: 5 })
  value: number;
}
