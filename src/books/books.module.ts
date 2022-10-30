import { AuthorsModule } from './../authors/authors.module';
import { GenreModule } from './../genre/genre.module';

import { BooksModel } from './books.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BooksModel,
        schemaOptions: { collection: 'Books' },
      },
    ]),
    GenreModule,
    AuthorsModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
