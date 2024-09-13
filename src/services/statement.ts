import { Statement, StatementLog } from "@prisma/client";
import db from "../lib/db";

type CreateStatement = Omit<Statement, "id" | "flag">;
type CreateLog = Omit<StatementLog, "id">;

type Response<T> =
  | {
      data: T;
      error?: never;
    }
  | {
      data?: never;
      error: string;
    };

export class StatementService {
  static async create({
    from,
    to,
    amout,
  }: CreateStatement): Promise<Response<Statement>> {
    try {
      const flag = await this.validateFlag(from, to, amout);

      const statement = await db.statement.create({
        data: { from, to, amout, flag },
        select: {
          id: true,
          from: true,
          to: true,
          amout: true,
          flag: true,
        },
      });

      return { data: statement };
    } catch (err: any) {
      return { error: err?.message ?? "Error" };
    }
  }

  static async validateFlag(from: bigint, to: bigint, amout: bigint) {
    const _amout = this.convertAmout(amout);

    if (_amout < 0) throw new Error("Invalid amout");

    const existedStatement = await db.statement.findFirst({
      where: {
        from,
        to,
        amout,
      },
    });

    if (existedStatement) throw new Error("Duplicated statement");
    if (_amout > 50000) return true;

    return false;
  }

  static convertAmout(amout: bigint) {
    return Number(amout) / 100;
  }

  static async log(log: CreateLog) {
    return await db.statementLog.create({
      data: log,
    });
  }
}
