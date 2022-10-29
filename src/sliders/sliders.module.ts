import { SlidersModel } from './sliders.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { SlidersController } from './sliders.controller';
import { SlidersService } from './sliders.service';

@Module({
  controllers: [SlidersController],
  providers: [SlidersService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SlidersModel,
        schemaOptions: { collection: 'Sliders' },
      },
    ]),
  ],
})
export class SlidersModule {}
