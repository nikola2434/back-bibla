import { Types } from 'mongoose';
import { SlidersModel } from './../sliders/sliders.model';
import { updateGenre } from './dto/updateGenre.dto';
import { GenreModel } from './genreModel';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
  ) {}

  async getAllGenres(page?: number, limit?: number, searchTerm?: string) {
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
    }
    return await this.GenreModel.find(options)
      .skip(limit * (page - 1))
      .limit(limit);
  }

  async getGenreBySlug(slug: string) {
    const genre = await this.GenreModel.findOne({ link: slug }).populate(
      'books',
    );
    if (!genre) throw new NotFoundException('Жанр не найден!');

    return genre;
  }
  async getGenreById(id: Types.ObjectId) {
    const genre = await this.GenreModel.findById(id).populate('books');
    if (!genre) throw new NotFoundException('Жанр не найден!');

    return genre;
  }

  async addBooks(idBook: Types.ObjectId, genre: string) {
    const options = {
      $or: [{ title: new RegExp(genre, 'i') }],
    };
    return await this.GenreModel.findOneAndUpdate(options, {
      $addToSet: { books: [idBook] },
    });
  }

  async deleteBooks(idBook: Types.ObjectId, genre: string) {
    const options = {
      $or: [{ title: new RegExp(genre, 'i') }],
    };
    return await this.GenreModel.findByIdAndUpdate(options, {
      $pull: { books: [idBook] },
    });
  }

  async createGenre() {
    const newGenre: updateGenre = {
      title: ' ',
      link: ' ',
      icons: 'MdBook',
      description: ' ',
      books: [],
    };
    const genre = await this.GenreModel.create(newGenre);
    return { newId: genre._id };
  }

  async updateGenre(id: Types.ObjectId, dto: updateGenre) {
    if ((dto.icons === ' ' || dto.link === ' ', dto.title === ' ')) {
      await this.GenreModel.findByIdAndDelete(id);
      throw new BadRequestException('Не верные данные!');
    }

    return this.GenreModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async deleteGenre(id: Types.ObjectId) {
    return await this.GenreModel.findByIdAndDelete(id).exec();
  }

  async getCountGenres() {
    return await this.GenreModel.find().count().exec();
  }
}
