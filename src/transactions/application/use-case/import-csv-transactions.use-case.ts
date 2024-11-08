import { Request, Response } from "express";
import { TransactionsAdapted } from "../adapter/csv-transactions.adapter";
import { TransactionReason } from "../../domain/enum/transaction-reason.enum";
import { TransactionRepository } from "../../infra/prisma/repository/transaction.repository";
import { InvalidTransactionRepository } from "../../infra/prisma/repository/invalid-transaction.repository";

export class ImportCSVTransactionsUseCase {
  public async execute(
    req: Request,
    res: Response,
    transactions: TransactionsAdapted[]
  ) {
    try {
      await this.importCSV(req, res, transactions);
    } catch (err) {
      return res.status(500).json({
        message: "Erro interno, contate o suporte",
      });
    }
  }

  private async importCSV(
    req: Request,
    res: Response,
    transactions: TransactionsAdapted[]
  ) {
    const invalidTransactions: InvalidTransaction[] = [];
    const validTransactions: ValidTransaction[] = [];

    const fileName = req.file?.filename || "no-file-name";

    for (const transaction of transactions) {
      if (transaction.amount > 0) {
        const suspicious = transaction.amount > 5000000 ? true : false;

        validTransactions.push({
          ...transaction,
          suspicious,
        });
      } else {
        invalidTransactions.push({
          ...transaction,
          reason: TransactionReason.NEGATIVE,
          file_name: fileName,
        });
      }
    }

    const transactionRepository = new TransactionRepository();
    const invalidTransactionRepository = new InvalidTransactionRepository();

    let validTransactionsCount = 0;

    for await (const transaction of validTransactions) {
      try {
        await transactionRepository.insertOne({
          amount: transaction.amount,
          from: transaction.from,
          suspicous: transaction.suspicious,
          to: transaction.to,
          transaction_id: transaction.transaction_id,
        });
        validTransactionsCount++;
      } catch (err) {
        invalidTransactions.push({
          ...transaction,
          file_name: fileName,
          reason: TransactionReason.DUPLICATED,
        });
      }
    }

    for await (const invalidTransaction of invalidTransactions) {
      invalidTransactionRepository.insertOne(invalidTransaction);
    }

    const statusCode = validTransactionsCount > 0 ? 201 : 200;

    return res.status(statusCode).json({
      validTransactionsCount,
      invalidTransactions,
    });
  }
}

export interface InvalidTransaction {
  from: string;
  to: string;
  amount: number;
  file_name: string;
  reason: string;
}

export interface ValidTransaction {
  from: string;
  to: string;
  amount: number;
  suspicious: boolean;
  transaction_id: string;
}
