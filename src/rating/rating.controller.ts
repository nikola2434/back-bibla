import { setRatingDto } from './rating.dto';
import { RatingService } from './rating.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';
import { Types } from 'mongoose';
import { User } from 'src/user/deccorators/user.deccorator';

@Controller('rating')
export class RatingController {
  constructor(private readonly RatingService: RatingService) {}

  @Get('evaluated')
  @Auth()
  async getEvaluated(@User('_id') _id: Types.ObjectId) {
    return await this.RatingService.getEvaluatedBooks(_id);
  }

  @Get(':bookId')
  @Auth()
  async getValueRating(
    @Param('bookId') bookId: Types.ObjectId,
    @User('_id') _id: Types.ObjectId,
  ) {
    return await this.RatingService.getValueBooks(_id, bookId);
  }

  @Put()
  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async setRating(@User('_id') _id: Types.ObjectId, @Body() dto: setRatingDto) {
    return await this.RatingService.setValue(_id, dto);
  }
}
