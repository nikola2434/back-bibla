import { path } from 'app-root-path';
import { Injectable } from '@nestjs/common';
import { IFileResponse } from './fileResponse.interface';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async filesUploads(
    files: Express.Multer.File[],
    folder = 'default',
  ): Promise<IFileResponse[]> {
    console.log(folder);
    const uploadFile = `${path}/uploads/${folder}`;

    await ensureDir(uploadFile);

    const res: IFileResponse[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFile}/${file.originalname}`, file.buffer);

        return {
          urL: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        } as IFileResponse;
      }),
    );

    return res;
  }
}
