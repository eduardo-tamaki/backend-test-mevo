import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OperationsValidateUseCase } from '../use-cases';

@Controller('operations')
export class FinancialOperationsController {
  constructor(private readonly uploadUseCase: OperationsValidateUseCase) {}

  @Get()
  test(): string {
    return 'Testing controller';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadOperations(@UploadedFile() file: Express.Multer.File): void {
    this.uploadUseCase.execute({ file })
  }
}
