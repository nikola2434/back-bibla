import { SlidersModule } from './sliders/sliders.module';

import { GenreModule } from './genre/genre.module';
import { getMongoConfig } from './config/mongo.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';

import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    GenreModule,
    FilesModule,
    BooksModule,
    AuthorsModule,
    SlidersModule,
    RatingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
