import { SlidersDto } from './sliders.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { SlidersModel } from './sliders.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class SlidersService {
  constructor(
    @InjectModel(SlidersModel)
    private readonly SlidersModel: ModelType<SlidersModel>,
  ) {}

  async getAllSliders() {
    return await this.SlidersModel.find();
  }

  async createSlider(dto: SlidersDto) {
    return await this.SlidersModel.create(dto);
  }

  async updateSlider(id: Types.ObjectId, dto: SlidersDto) {
    return await this.SlidersModel.findByIdAndUpdate(id, dto).exec();
  }

  async removeSlider(id: Types.ObjectId) {
    return await this.SlidersModel.findByIdAndDelete(id);
  }
}
