
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GenreModel } from './genreModel';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: GenreModel,
        schemaOptions: { collection: 'Genre' },
      },
    ]),
  ],
})
export class GenreModule {}
