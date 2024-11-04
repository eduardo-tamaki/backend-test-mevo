import {
  Controller,
  Post,
  UseInterceptors,
  Param,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload/:token')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param() params: { token: string },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: Number(process.env.UPLOAD_MAX_FILE_SIZE || 5242880),
          }),
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.appService.importCsv(file, params.token);
  }
}
