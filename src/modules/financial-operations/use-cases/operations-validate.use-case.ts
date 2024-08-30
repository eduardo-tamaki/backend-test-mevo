import { Injectable } from '@nestjs/common';

@Injectable()
class OperationsValidateUseCase {
  constructor() {}

  async execute({ file }: { file: Express.Multer.File }) {
    const dataRaw = file.buffer.toString().split('\r');
    const data: FinancialOperation[] = this.parseFile(dataRaw);

    // This would be an external service class that would do all the validation
    for (let i = 0; i < data.length; i++) {
      console.log(this.isAmountNegative(data[i].amount));
    }
  }

  private isAmountNegative(amount: number): boolean {
    return amount < 0
  }

  private parseFile(fileRaw: string[]): FinancialOperation[] {
    const result = [];

    for (let i = 1; i < fileRaw.length; i++) {
      const rowRaw = fileRaw[i].split(',');

      result.push(this.parseFileRow(rowRaw));
    }

    return result;
  }

  private parseFileRow(rowRaw: string[]): FinancialOperation {
    return {
      from: parseInt(rowRaw[0].trim()),
      to: parseInt(rowRaw[1].trim()),
      amount: parseInt(rowRaw[2].trim()),
    };
  }
}

type FinancialOperation = {
  from: number
  to: number
  amount: number
  isValid?: boolean
  invalidReason?: InvalidFinancialOperations
};

enum InvalidFinancialOperations {
  NEGATIVE_VALUES = 'Negative transaction amount',
}

export default OperationsValidateUseCase;
