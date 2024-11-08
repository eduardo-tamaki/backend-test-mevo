import { Request, Response } from "express";
import csvtojson from "csvtojson";

export class TransactionControler {
  async importCSV(req: any, res: Response) {
    console.log("req", req.file);

    if (!req.file.path) {
      res.status(400).json({
        message: "É necessário enviar o arquivo csv",
      });
    }

    const csvFile = await csvtojson({
      delimiter: ";",
    }).fromFile(req.file.path);

    console.log("Csv file", csvFile);

    return res.status(200).json({
      message: "Deu tudo certo",
    });
  }
}
