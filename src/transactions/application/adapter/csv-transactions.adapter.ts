import csvtojson from "csvtojson";
import { CsvTransactionDto } from "../dto/csv-transaction.dto";

export class CsvTransactionsAdapter {
  public static async execute(file: Express.Multer.File) {
    let transactionsAdapted: TransactionsAdapted[] = [];

    let error = false;

    if (file.mimetype !== "text/csv") {
      error = true;
    }

    try {
      const transactionsFromCsvFile: CsvTransactionDto[] = await csvtojson({
        delimiter: ";",
      }).fromFile(file.path);

      if (transactionsFromCsvFile && transactionsFromCsvFile?.length) {
        const isCsvValid = this.validateCsv(transactionsAdapted[0]);

        if (!isCsvValid) {
          error = true;
        }

        for (const transaction of transactionsFromCsvFile) {
          transactionsAdapted.push({
            amount: Number(transaction.amount),
            from: transaction.from,
            to: transaction.to,
            transaction_id: this.generateTransactionId(transaction),
          });
        }
      }
    } catch (err) {
      error = true;
    }

    return {
      transactionsAdapted,
      error,
    };
  }

  public static validateCsv(transaction: TransactionsAdapted) {
    if (!transaction?.amount || !transaction?.from || !transaction.to) {
      return true;
    }

    return false;
  }

  public static generateTransactionId(transaction: CsvTransactionDto) {
    return `${transaction.from}-${transaction.to}-${transaction.amount}`;
  }
}

export interface TransactionsAdapted {
  from: string;
  to: string;
  amount: number;
  transaction_id: string;
}
