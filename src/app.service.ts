import { Injectable, BadRequestException } from '@nestjs/common';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

@Injectable()
export class AppService {
  async importCsv(file: Express.Multer.File) {
    try {
      const records = await this.processCsv(file);
      console.log('records: ', records);
      return records;
    } catch (error) {
      throw error;
    }
  }

  async processCsv(file: Express.Multer.File): Promise<any[]> {
    const bufferFile = Readable.from(file.buffer.toString());
    const records = [];

    return new Promise((resolve, reject) => {
      bufferFile
        .pipe(parse({ columns: true, delimiter: ';' }))
        .on('data', (data) => {
          records.push(data);
        })
        .on('end', () => resolve(records))
        .on('error', (error) =>
          reject(
            new BadRequestException(
              'Erro ao processar arquivo: ' + error.message,
            ),
          ),
        );
    });
  }

  async validateFileRow(rowData) {}
}
