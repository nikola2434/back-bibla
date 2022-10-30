import { AuthorsService } from './../authors/authors.service';
import { GenreService } from './../genre/genre.service';
import { BooksModel } from './books.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { bookDto } from './books.dto';
import { Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BooksModel) private readonly BooksModel: ModelType<BooksModel>,
    private readonly GenreService: GenreService,
    private readonly AuthorsService: AuthorsService,
  ) {}

  async getAllBooks(page?: number, limit?: number, searchTerm?: string) {
    let options = {};
    if (searchTerm) {
      options = {
        $or: [
          { title: new RegExp(searchTerm, 'i') },
          { description: new RegExp(searchTerm, 'i') },
        ],
      };
    }
    return await this.BooksModel.find(options)
      .sort({ createdAt: 'desc' })
      .skip(limit * (page - 1))
      .limit(limit);
  }

  async getBookById(id: string) {
    return await this.BooksModel.findById(id).exec();
  }

  async createBook() {
    const defaultBook: bookDto = {
      author: ' ',
      poster: ' ',
      title: ' ',
      description: ' ',
      genre: ' ',
    };
    const book = await this.BooksModel.create(defaultBook);
    return book._id;
  }

  async updateBook(id: Types.ObjectId, dto: bookDto) {
    if (
      (dto.author === ' ' || dto.genre === ' ',
      dto.poster === ' ',
      dto.title === ' ')
    ) {
      await this.BooksModel.findByIdAndDelete(id);
      throw new BadRequestException('Не верные данные!');
    }

    await this.AuthorsService.addBook(id, dto.author);
    await this.GenreService.addBooks(id, dto.genre);
    return await this.BooksModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async deleteBook(id: string) {
    return await this.BooksModel.findByIdAndDelete(id).exec();
  }

  async getCountBooks() {
    return await this.BooksModel.find().count().exec();
  }

  async getPopularBook() {
    const books = await this.BooksModel.find().sort({ rating: 'desc' });
    return books[0];
  }

  async updateRating(bookId: Types.ObjectId, rating: number) {
    return await this.BooksModel.findByIdAndUpdate(bookId, { rating }).exec();
  }
}
