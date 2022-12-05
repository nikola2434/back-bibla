import { updateAuthor } from './updateAuthor.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthorsModel } from './authorsModel';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import { Types } from 'mongoose';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(AuthorsModel)
    private readonly AuthorsModel: ModelType<AuthorsModel>,
  ) {}

  async getAllBooks(page?: number, limit?: number, searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [{ nameAuthor: new RegExp(searchTerm, 'i') }],
      };
    }
    return await this.AuthorsModel.find(options)
      .sort({ createdAt: 'desc' })
      .skip(limit * (page - 1))
      .limit(limit)
      .populate('BooksWritten');
  }

  async getById(id: string) {
    return await await this.AuthorsModel.findById(id).populate('BooksWritten');
  }

  async addBook(idBook: Types.ObjectId, name: string) {
    const options = {
      $or: [{ nameAuthor: new RegExp(name, 'i') }],
    };

    return await this.AuthorsModel.findOneAndUpdate(options, {
      $addToSet: { BooksWritten: [idBook] },
    });
  }

  async deleteBook(idBook: Types.ObjectId, genre: string) {
    const options = {
      $or: [{ title: new RegExp(genre, 'i') }],
    };
    return await this.AuthorsModel.findByIdAndUpdate(options, {
      $pull: { BooksWritten: [idBook] },
    });
  }

  async createAuthor() {
    const newAuthor: updateAuthor = {
      avatar:
        'http://localhost:5000/uploads/test/misterwives-connect-the-dots-music-paper-graphics-hummingbird-2-3-png-clip-art.png',
      BooksWritten: [],
      country: ' ',
      DateOfBirth: ' ',
      nameAuthor: ' ',
    };

    const author = await this.AuthorsModel.create(newAuthor);
    return { newId: author._id };
  }

  async updateAuthor(id: string, dto: updateAuthor) {
    if ((dto.avatar === ' ' || dto.country === ' ', dto.nameAuthor === ' ')) {
      await this.AuthorsModel.findByIdAndDelete(id);
      throw new BadRequestException('Не верные данные!');
    }

    return await this.AuthorsModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
  }

  async deleteAuthor(id: string) {
    return await this.AuthorsModel.findByIdAndDelete(id).exec();
  }

  async getCount() {
    return await this.AuthorsModel.find().count().exec();
  }
}
