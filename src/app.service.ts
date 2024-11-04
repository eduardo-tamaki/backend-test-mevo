import { Injectable, BadRequestException } from '@nestjs/common';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

import { PurchasesService } from './purchases/purchases.service';
import { ImportsService } from './imports/imports.service';

interface FileLineDto {
  from: string;
  to: string;
  amount: number;
  alert?: string;
  error?: string;
}

@Injectable()
export class AppService {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly importsService: ImportsService,
  ) {}

  async importCsv(file: Express.Multer.File) {
    const nameFile = file.originalname;
    try {
      const records = await this.processCsv(file);
      return await this.processData(records, nameFile);
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

  async processData(records: FileLineDto[], nameFile: string) { 
    const validRows = [];
    const invalidRows = [];
    const suspectRows = [];
    const uniqueRecordsMap = new Map<string, number>();

    for (const record of records) {
      const recordKey = `${record.from}-${record.to}-${record.amount}`;
      uniqueRecordsMap.set(
        recordKey,
        (uniqueRecordsMap.get(recordKey) || 0) + 1,
      );
    }

    for (const record of records) {
      const recordKey = `${record.from}-${record.to}-${record.amount}`;
      const uniqueCount = uniqueRecordsMap.get(recordKey) === 1;

      if (record.amount < 0) {
        invalidRows.push({ ...record, error: 'Valor negativo' });
      } else if (!uniqueCount) {
        invalidRows.push({ ...record, error: 'Registro duplicado' });
      } else if (record.amount > 5000000) {
        suspectRows.push({ ...record, alert: 'Valor suspeito' });
      } else {
        validRows.push(record);
      }
    }

    const processedRows = [...validRows, ...suspectRows];

    for (const row of processedRows) {
      await this.purchasesService.create(row);
    }

    await this.importsService.create({
      document_name: nameFile,
      valid_rows: validRows.length,
      suspect_rows: suspectRows.length,
      invalid_rows: invalidRows.length,
      processed_rows: processedRows.length
    });

    return {
      validRows: {
        count: validRows.length,
      },
      suspectRows: {
        count: suspectRows.length,
      },
      invalidRows: {
        count: invalidRows.length,
        rows: invalidRows,
      },
      processedRows: {
        count: processedRows.length,
      },
    };
  }
}
