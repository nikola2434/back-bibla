import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
  @prop({ required: true })
  userId: Types.ObjectId;

  @prop({ required: true })
  bookId: Types.ObjectId;

  @prop({ max: 5 })
  value: number;
}
