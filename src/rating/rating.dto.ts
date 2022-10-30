import { IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class setRatingDto {
  bookId: Types.ObjectId;

  @IsNumber()
  value: number;
}
