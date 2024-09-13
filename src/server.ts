import express from "express";

import { StatementController } from "./controllers/statement";

const app = express();
app.use(express.json());

app.post("/statement/upload", StatementController.upload);

app.listen(3000, () => {
  console.log("Server running");
});
