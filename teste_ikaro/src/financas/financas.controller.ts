import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FinancasService } from './financas.service';
import { CreateFinancaDto } from './dto/create-financa.dto';
import { UpdateFinancaDto } from './dto/update-financa.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('financas')
export class FinancasController {
  constructor(private readonly financasService: FinancasService) {}

  @Post()
  @ApiConsumes('multipart/form-data') // Indica que o tipo de conteúdo é multipart/form-data
  @ApiBody({
    schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  }
  })
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads'
  }), )
  create(@UploadedFile() file: Express.Multer.File) {
    
    if(file.mimetype !== 'text/csv'){
      throw new BadRequestException("File is not suported")
    }
  
    return this.financasService.create(file.path);
  }


  

 
}
