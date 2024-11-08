import { Router } from "express";
import multer from "multer";
import { TransactionControler } from "../controller/transaction.controller";

const upload = multer({ dest: "uploads/csv" });

const transactionRouter = Router();

const transactionControler = new TransactionControler();

transactionRouter.post(
  "/",
  upload.single("transaction"),
  transactionControler.importCSV
);

export default transactionRouter;
