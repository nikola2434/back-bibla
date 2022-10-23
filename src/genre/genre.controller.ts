import { updateGenre } from './dto/updateGenre.dto';
import { GenreService } from './genre.service';
import {
  Controller,
  Get,
  Put,
  Delete,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { idValidationPipe } from 'src/pipes/idValidationPipe';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';

@Controller('genre')
export class GenreController {
  constructor(private readonly GenreService: GenreService) {}

  @Get('allGenres')
  async getAllGenres(
    @Query('searchTerm') searchTerm?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return await this.GenreService.getAllGenres(page, limit, searchTerm);
  }

  @Get('byId/:_id')
  async getGenreById(@Param('_id', idValidationPipe) _id: string) {
    return await this.GenreService.getGenreById(_id);
  }

  @Get('create')
  @Auth('admin')
  async createGenre() {
    return await this.GenreService.createGenre();
  }

  @Put(':_id')
  @Auth('admin')
  @UsePipes(new ValidationPipe())
  async updateGenre(
    @Param('_id', idValidationPipe) _id: string,
    @Body() dto: updateGenre,
  ) {
    return await this.GenreService.updateGenre(_id, dto);
  }

  @Delete(':_id')
  @Auth('admin')
  async deleteGenre(@Param('_id', idValidationPipe) _id: string) {
    return await this.GenreService.deleteGenre(_id);
  }

  @Get('count')
  @Auth('admin')
  async getCountGenres() {
    return await this.GenreService.getCountGenres();
  }
}
