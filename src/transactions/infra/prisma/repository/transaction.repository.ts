import { Transactions } from "@prisma/client";
import { TransactionRepositoryInterface } from "../../../domain/repository/transaction-repository.interface";
import { prisma } from "../../../../@core/infra/prisma/prisma.client";
//import { v4 as uuid } from "uuid";

export class TransactionRepository implements TransactionRepositoryInterface {
  async insertOne(data: Omit<Transactions, "id">): Promise<Transactions> {
    return await prisma.transactions.create({
      data: {
        //id: uuid(),
        amount: data.amount,
        from: data.from,
        to: data.to,
        transaction_id: data.transaction_id,
        suspicous: data.suspicous,
      },
    });
  }
}
