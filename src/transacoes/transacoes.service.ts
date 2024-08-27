import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Transacao } from './entities/transacao.entity';
import { Readable } from 'stream';
import * as csv from 'csv-parser';
import { create } from 'domain';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectRepository(Transacao)
    private TransacaoRepository: Repository<Transacao>,
  ) {}

  async create(createDto: CreateTransacaoDto) {
    try {
      return await this.TransacaoRepository.save(createDto);
    } catch (e) {
      throw new BadRequestException(`Erro ao cadastrar transação: ${e}`);
    }
  }

  findAll() {
    return this.TransacaoRepository.find();
  }

  findOne(id: number) {
    return this.TransacaoRepository.findOneBy({ id });
  }

  update(id: number, updateDto: UpdateTransacaoDto) {
    return this.TransacaoRepository.update(id, updateDto);
  }

  remove(id: number) {
    return this.TransacaoRepository.delete(id);
  }

  async importarArquivo(FileCVS: Express.Multer.File) {
    const RegistrosCSV = await new Promise<any[]>((resolve, reject) => {
      const registros = [];
      const stream = Readable.from(FileCVS.buffer).pipe(csv());

      stream.on('data', (row) => {
        registros.push(row);
      });

      stream.on('end', () => {
        resolve(registros);
      });

      stream.on('error', (error) => {
        reject(
          new BadRequestException(
            `Erro ao processar o arquivo CSV: ${error.message}`,
          ),
        );
      });
    });

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
          origem: From,
          destino: To,
          valor: Amount,
          id: ID,
        });
        continue;
      }

      if (RegistrosIncluir.find((x) => x.id === ID)) {
        //evita duplicação
        RegistrosDuplicados.push({
          origem: From,
          destino: To,
          valor: Amount,
          id: ID,
        });
        continue;
      }

      RegistrosIncluir.push({
        origem: From,
        destino: To,
        valor: Amount,
        id: ID,
        operacao_suspeita: Amount > 50000,
      });

      this.TransacaoRepository.save({
        origem: From,
        destino: To,
        valor: Amount,
        transacao_suspeita: Amount > 50000,
      });
    }

    //console.log('RegistrosDuplicados', JSON.stringify(RegistrosDuplicados));
    //console.log('RegistrosNegativos', JSON.stringify(RegistrosNegativos));
    console.log('RegistrosIncluir', JSON.stringify(RegistrosIncluir));

    return {
      registros_incluidos: RegistrosIncluir.length,
      registros_duplicados: RegistrosDuplicados,
      registros_negativos: RegistrosNegativos,
    };
  }
}
