import { Request } from "express";

export class ImportCSVTransactionsUseCase {
  public async execute(req: Request, res: Response, transactions) {
    try {
      await this.importCSV(req, res, transactions);
    } catch (err) {}
  }

  private async importCSV(req, res, transactions) {}
}
