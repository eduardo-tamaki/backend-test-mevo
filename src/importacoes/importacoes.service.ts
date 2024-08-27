import { Injectable } from '@nestjs/common';
import { CreateImportacoeDto } from './dto/create-importacoe.dto';
import { UpdateImportacoeDto } from './dto/update-importacoe.dto';
import { Readable } from 'stream';
import * as csv from 'csv-parser';

@Injectable()
export class ImportacoesService {
  create(FileCVS: Express.Multer.File) {}

  async importarArquivo(FileCVS: Express.Multer.File) {
    const results = [];

    const stream = Readable.from(FileCVS.buffer).pipe(csv());

    // Parse o CSV linha a linha
    stream.on('data', (row) => {
      results.push(row);
    });

    stream.on('end', () => {
      console.log(results); // Aqui você pode trabalhar com os dados lidos
    }); //
  }

  findAll() {
    return `This action returns all importacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importacoe`;
  }

  update(id: number, updateImportacoeDto: UpdateImportacoeDto) {
    return `This action updates a #${id} importacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} importacoe`;
  }
}
