import { BooksModule } from './../books/books.module';
import { RatingModel } from './rating.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: { collection: 'rating' },
      },
    ]),
    BooksModule
  ],
})
export class RatingModule {}
