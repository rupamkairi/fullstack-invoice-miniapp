import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const invoices: any = [];

app.post("/", (req, res) => {
  invoices.push(req.body);
  res.status(201).send({ message: "Successfully added" });
});

app.get("/", (req: Request, res: Response) => {
  res.send({ invoices });
});

app.get("/:id", (req: Request, res: Response) => {
  const invoice = invoices.find((inv: any) => inv.invoiceNo === req.params.id);
  res.send({ invoice });
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
