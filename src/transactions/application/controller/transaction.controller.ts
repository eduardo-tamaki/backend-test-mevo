import { Request, Response } from "express";

export class TransactionControler {
  importCSV(req: Request, res: any) {
    console.log("req", req.file);

    return res.status(200).json({
      message: "Deu tudo certo",
    });
  }
}
