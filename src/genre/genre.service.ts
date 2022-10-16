import { updateGenre } from './dto/updateGenre.dto';
import { GenreModel } from './../../dist/genre/genre.model.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
  ) {}

  async getAllGenres(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
          {
            description: new RegExp(searchTerm, 'i'),
          },
        ],
      };

      return await this.GenreModel.find(options).exec();
    }
  }

  async getGenreById(id: string) {
    const genre = await this.GenreModel.findById(id);
    if (!genre) throw new NotFoundException('Жанр не найден!');

    return genre;
  }

  async createGenre() {
    const newGenre: updateGenre = {
      title: '',
      link: '',
      icons: '',
      description: '',
      books: [],
    };
    const genre = await this.GenreModel.create(newGenre);
    return genre._id;
  }

  async updateGenre(id: string, dto: updateGenre) {
    return this.GenreModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteGenre(id: string) {
    return await this.GenreModel.findByIdAndDelete(id).exec();
  }

  async getCountGenres() {
    return await this.GenreModel.find().count().exec();
  }
}
