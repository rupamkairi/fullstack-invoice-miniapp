import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvoiceView from "../components/Invoices/InvoiceView";
import { invoiceForm } from "../interfaces/invoiceForm";

export default function Index() {
  const [invoices, setInvoices] = useState<invoiceForm[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000").then((res) => {
      console.log(res.data);
      setInvoices(res.data.invoices);
    });
  }, []);

  return (
    <div>
      <Link to="/invoice">
        <Button>Create Invoice</Button>
      </Link>

      <Typography variant="h6" my={2}>
        {invoices.length
          ? "All Invoices"
          : "No Invoice found, Create one first"}
      </Typography>

      {invoices.map((invoice, key) => (
        <div key={key}>
          <InvoiceView invoice={invoice} />
        </div>
      ))}
    </div>
  );
}
