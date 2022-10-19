import { updateAuthor } from './updateAuthor.dto';
import { AuthorsService } from './authors.service';
import { Controller, Get, Query, Param, Post, Put, ValidationPipe , UsePipes, Body, Delete} from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly AuthorsService: AuthorsService) {}
  @Get("count")
  @Auth("admin")
  async getCount (){
    return this.AuthorsService.getCount()
  }

  @Get()
  async getAllBooks(@Query('searchTerm') searchTerm?: string) {
    return await this.AuthorsService.getAllBooks(searchTerm);
  }

  @Get(':_id')
  async getById(@Param('_id') _id: string) {
    return await this.AuthorsService.getById(_id);
  }

  @Post()
  @Auth('admin')
  async createAuthor() {
    return this.AuthorsService.createAuthor();
  }

  @Put(":id")
  @Auth("admin")
  @UsePipes(new ValidationPipe)
  async updateAuthor(@Param("id") id:string, @Body() dto:updateAuthor ){
    return await this.AuthorsService.updateAuthor(id, dto)
  }

  @Delete(":id")
  @Auth("admin")
  async deleteAuthor(@Param("id") id:string){
    return this.AuthorsService.deleteAuthor(id)
  }


}
