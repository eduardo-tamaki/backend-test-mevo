import { Injectable } from '@nestjs/common';
import { CreateImportacoeDto } from './dto/create-importacoe.dto';
import { UpdateImportacoeDto } from './dto/update-importacoe.dto';
import { Readable } from 'stream';
import * as csv from 'csv-parser';

@Injectable()
export class ImportacoesService {
  create(FileCVS: Express.Multer.File) {}

  async importarArquivo(FileCVS: Express.Multer.File) {
    const RegistrosCSV = [];
    const stream = Readable.from(FileCVS.buffer).pipe(csv());

    // Parse o CSV linha a linha
    stream.on('data', (row) => {
      RegistrosCSV.push(row);
    });

    stream.on('end', processarArquivos); //

    async function processarArquivos() {
      let RegistrosIncluir = [];
      let RegistrosDuplicados = [];
      let RegistrosNegativos = [];

      for (let index = 0; index < RegistrosCSV.length; index++) {
        const Item = RegistrosCSV[index];

        const Colunas = Item['from;to;amount'];
        //console.log(Colunas);

        const ArrayColunas = Colunas.split(';');

        let From = ArrayColunas[0];
        let To = ArrayColunas[1];
        let Amount = ArrayColunas[2];
        let ID = From + To + Amount;
        Amount = parseFloat(Amount) / 100;

        if (Amount < 0) {
          RegistrosNegativos.push({
            from: From,
            to: To,
            amount: Amount,
            id: ID,
          });
          continue;
        }

        if (RegistrosIncluir.find((x) => x.id === ID)) {
          //evita duplicação
          RegistrosDuplicados.push({
            from: From,
            to: To,
            amount: Amount,
            id: ID,
          });
          continue;
        }

        RegistrosIncluir.push({
          from: From,
          to: To,
          amount: Amount,
          id: ID,
          operacao_suspeita: Amount > 50000,
        });
      }

      console.log('RegistrosDuplicados', JSON.stringify(RegistrosDuplicados));
      console.log('RegistrosNegativos', JSON.stringify(RegistrosNegativos));
      console.log('RegistrosIncluir', JSON.stringify(RegistrosIncluir));
    }
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
