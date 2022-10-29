import { AuthorsModel } from './authorsModel';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthorsModel,
        schemaOptions: { collection: 'Authors' },
      },
    ]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
