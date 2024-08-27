import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post('importar-arquivo-csv')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.transacoesService.importarArquivo(file);
  }

  @Post()
  create(@Body() createDto: CreateTransacaoDto) {
    return this.transacoesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.transacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacoesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTransacaoDto) {
    return this.transacoesService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transacoesService.remove(+id);
  }
}
