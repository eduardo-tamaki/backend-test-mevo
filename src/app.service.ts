import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class AppService {
  async processCsv(file: Express.Multer.File): Promise<any> {
    const bufferFile = file.buffer;

    const parseData: any = await new Promise((resolve, reject) => {
      csv.parser(
        bufferFile,
        {
          columns: true,
          relax_quotes: true,
          skip_empty_lines: true,
          cast: true,
        },
        (error, records) => {
          if (error) {
            reject(error);
            return {
              error: true,
              message: 'Invalido para parse',
            };
          }
          resolve(records);
        },
      );

      const errors: string[] = [];
      if (!parseData.length) {
        errors.push('Arquivo vazio');
        return {
          error: true,
          message: 'arquivo invalido',
          errorsArray: errors,
        };
      }

      for await (const [index, rowData] of parseData.entries()) {
        const validationErros = await this.validateFileRow(rowData);

        if (validationErros.length) {
          return {
            error: true,
            errorsArray: validationErros,
            message: 'Falha validação linha:' + (index + 1),
          };
        }
      }

      return {
        errors: false,
      };
    });
  }

  async validateFileRow(rowData) {
    const erros: string[] = [];
    const csvDto = plainToInstance(CSVDTO, rowData);
    const validationErros = await validate(csvDto);

    if (validationErros.length > 0) {
      validationErros.forEach((error) => {
        const { property, constraints } = error;
        const errorMessage = property + constraints.join(', ');
        erros.push(errorMessage);
      });
    }
  }
}
