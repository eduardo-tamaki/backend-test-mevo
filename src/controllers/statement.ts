import { randomUUID } from "node:crypto";

import { Request, Response } from "express";
import { StatementService } from "../services/statement";

interface Transaction {
  from: bigint;
  to: bigint;
  amout: bigint;
}

interface InvalidTransaction {
  id: number;
  error: string;
}

export class StatementController {
  static async upload(req: Request, res: Response) {
    const transactions = (req.body?.transactions as Transaction[]) || [];
    if (!transactions)
      return res.status(404).json({
        error: "File not found",
      });

    let valid = 0;
    const invalid: any[] = [];
    for (const transaction of transactions) {
      const _transaction = await StatementService.create({
        from: transaction.from,
        to: transaction.to,
        amout: transaction.amout,
      });

      if (_transaction?.data) {
        valid++;
        continue;
      }

      const log = await StatementService.log({
        file: randomUUID(),
        from: transaction.from,
        to: transaction.to,
        amout: transaction.amout,
        error: _transaction.error,
      });

      invalid.push({ id: log.id, error: log.error });
    }

    return res.status(200).json({
      data: {
        count: valid,
        errors: invalid,
      },
    });
  }
}
