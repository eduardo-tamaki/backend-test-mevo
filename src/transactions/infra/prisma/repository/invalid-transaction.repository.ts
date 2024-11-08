import { InvalidTransactions } from "@prisma/client";
import { prisma } from "../../../../@core/infra/prisma/prisma.client";
import { InvalidTransactionRepositoryInterface } from "../../../domain/repository/invalid-transaction-repository.interface";
/* import { v4 as uuid } from "uuid"; */

export class InvalidTransactionRepository
  implements InvalidTransactionRepositoryInterface
{
  async insertOne(
    data: Omit<InvalidTransactions, "id">
  ): Promise<InvalidTransactions> {
    return await prisma.invalidTransactions.create({
      data: {
        //id: uuid(),
        amount: data.amount,
        from: data.from,
        to: data.to,
        file_name: data.file_name,
        reason: data.reason,
      },
    });
  }
}
