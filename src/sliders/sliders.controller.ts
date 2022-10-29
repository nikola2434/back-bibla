import { idValidationPipe } from './../pipes/idValidationPipe';
import { SlidersDto } from './sliders.dto';
import { SlidersService } from './sliders.service';
import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';
import { Types } from 'mongoose';

@Controller('sliders')
export class SlidersController {
  constructor(private readonly SlidersService: SlidersService) {}

  @Get()
  async getAllSliders() {
    return await this.SlidersService.getAllSliders();
  }

  @Post()
  @Auth('admin')
  @UsePipes(new ValidationPipe())
  async createSlider(@Body() dto: SlidersDto) {
    return await this.SlidersService.createSlider(dto);
  }

  @Put(':id')
  @Auth('admin')
  @UsePipes(new ValidationPipe())
  async updateSlider(
    @Body() dto: SlidersDto,
    @Param('id', idValidationPipe) id: Types.ObjectId,
  ) {
    return await this.SlidersService.updateSlider(id, dto);
  }

  @Delete(':id')
  @Auth('admin')
  async deleteSlider(@Param('id', idValidationPipe) id: Types.ObjectId) {
    return await this.SlidersService.removeSlider(id);
  }
}
