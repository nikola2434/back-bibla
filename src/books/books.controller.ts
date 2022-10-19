import { BooksService } from './books.service';
import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
} from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';
import { bookDto } from './books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {}

  @Get('allBooks')
  async getAllBooks(@Query('searchTerm') searchTerm?: string) {
    return await this.BooksService.getAllBooks(searchTerm);
  }

  @Get('byId/:_id')
  async getBooksById(@Param('_id') _id: string) {
    return await this.BooksService.getBookById(_id);
  }

  @Get('create')
  @Auth('admin')
  async createBook() {
    return this.BooksService.createBook();
  }

  @Put(':_id')
  @UsePipes(new ValidationPipe())
  @Auth('admin')
  async updateBook(@Param('_id') _id: string, @Body() dto: bookDto) {
    return await this.BooksService.updateBook(_id, dto);
  }

  @Delete(':_id')
  @Auth('admin')
  async deleteBook(@Param('_id') _id: string) {
    return this.BooksService.deleteBook(_id);
  }

  @Get('count')
  @Auth('admin')
  async getCount() {
    return this.BooksService.getCountBooks();
  }
}
