import { BooksModel } from './books.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { bookDto } from './books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BooksModel) private readonly BooksModel: ModelType<BooksModel>,
  ) {}

  async getAllBooks(searchTerm?: string) {
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
      .exec();
  }

  async getBookById(id: string) {
    return await this.BooksModel.findById(id).exec();
  }

  async createBook() {
    const defaultBook: bookDto = {
      author: ' ',
      genre: ' ',
      poster: ' ',
      title: ' ',
      description: ' ',
    };
    const book = await this.BooksModel.create(defaultBook);
    return book._id;
  }

  async updateBook(id: string, dto: bookDto) {
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
}
