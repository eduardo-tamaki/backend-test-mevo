import express from "express";

import dotenv from "dotenv";
import transactionRouter from "./transactions/application/routes/transaction.route";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/transactions", transactionRouter);

app.listen(process.env.PORT, () => console.log("Server running"));
