import { Request, Response } from "express";
import { CsvTransactionsAdapter } from "../adapter/csv-transactions.adapter";
import { ImportCSVTransactionsUseCase } from "../use-case/import-csv-transactions.use-case";

export class TransactionControler {
  async importCSV(req: any, res: any) {
    if (!req.file.path) {
      res.status(400).json({
        message: "É necessário enviar o arquivo csv",
      });
    }

    const { error, transactionsAdapted } = await CsvTransactionsAdapter.execute(
      req.file
    );

    if (error) {
      return res.status(400).json({
        message: "Erro ao ler arquivo CSV",
      });
    }

    const importTransactionsUseCase = new ImportCSVTransactionsUseCase();

    return await importTransactionsUseCase.execute(
      req,
      res,
      transactionsAdapted
    );
  }
}
