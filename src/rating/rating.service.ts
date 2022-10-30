import { setRatingDto } from './rating.dto';
import { Types } from 'mongoose';
import { BooksService } from './../books/books.service';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RatingModel } from './rating.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(RatingModel)
    private readonly RatingModel: ModelType<RatingModel>,
    private readonly BooksService: BooksService,
  ) {}

  async getValueBooks(userId: Types.ObjectId, bookId: Types.ObjectId) {
    return await this.RatingModel.findOne({ userId, bookId })
      .select('value')
      .exec()
      .then((data) => (data ? data : 0));
  }

  async setValue(userId: Types.ObjectId, { bookId, value }: setRatingDto) {
    const newRating = await this.RatingModel.findOneAndUpdate(
      { bookId, userId },
      { userId, bookId, value },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    ).exec();

    const averageRating = await this.getAverageRating(bookId);
    await this.BooksService.updateRating(bookId, averageRating);
    return newRating;
  }

  async getAverageRating(bookId: Types.ObjectId | string) {
    const ratings: RatingModel[] = await this.RatingModel.aggregate()
      .match({ bookId: new Types.ObjectId(bookId) })
      .exec();

    return (
      ratings.reduce((acc, value) => acc + value.value, 0) / ratings.length
    );
  }

  async getEvaluatedBooks(userId: Types.ObjectId) {
    return await this.RatingModel.find({ userId: userId })
      .sort({ createdAt: 'desc' })
      .select('bookId')
      .populate('bookId')
      .exec();
  }
}
