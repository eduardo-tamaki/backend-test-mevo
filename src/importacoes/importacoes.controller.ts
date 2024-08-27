import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ImportacoesService } from './importacoes.service';
import { CreateImportacoeDto } from './dto/create-importacoe.dto';
import { UpdateImportacoeDto } from './dto/update-importacoe.dto';

@Controller('importacoes')
export class ImportacoesController {
  constructor(private readonly importacoesService: ImportacoesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.importacoesService.importarArquivo(file);
  }

  @Get()
  findAll() {
    return this.importacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importacoesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImportacoeDto: UpdateImportacoeDto,
  ) {
    return this.importacoesService.update(+id, updateImportacoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importacoesService.remove(+id);
  }
}
