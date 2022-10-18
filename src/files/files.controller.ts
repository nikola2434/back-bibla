import { FilesService } from './files.service';
import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/auth/deccorators/Auth.deccorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly FilesService: FilesService) {}

  @Post()
  @Auth('admin')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  async uploadsFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return await this.FilesService.filesUploads([file], folder);
  }
}
