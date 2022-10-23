import { updateAuthor } from './updateAuthor.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthorsModel } from './authorsModel';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PaginateQuery, paginate } from 'nestjs-paginate';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(AuthorsModel)
    private readonly AuthorsModel: ModelType<AuthorsModel>,
  ) {}

  async getAllBooks(page = 1, limit = 10, searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [{ nameAuthor: new RegExp(searchTerm, 'i') }],
      };
    }
    return await this.AuthorsModel.find(options)
      .sort({ createdAt: 'desc' })
      .skip(limit * (page - 1))
      .limit(limit);
  }

  async getById(id: string) {
    return await await this.AuthorsModel.findById(id).populate('BooksWritten');
  }

  async createAuthor() {
    const newAuthor: updateAuthor = {
      avatar: ' ',
      BooksWritten: [],
      country: ' ',
      DateOfBirth: ' ',
      nameAuthor: ' ',
    };

    const author = await this.AuthorsModel.create(newAuthor);
    return { newId: author._id };
  }

  async updateAuthor(id: string, dto: updateAuthor) {
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
