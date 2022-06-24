import { Box, Button, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InvoiceView from "../components/Invoices/InvoiceView";
import { invoiceForm } from "../interfaces/invoiceForm";

export default function InvoiceById() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<invoiceForm | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/${id}`).then((res) => {
      console.log(res.data.invoice);
      setInvoice(res.data.invoice);
    });
  }, [id]);

  return (
    <div>
      <Container>
        <Box mb={4}>
          <Link to={"/"}>
            <Button>Go to Home</Button>
          </Link>
        </Box>
      </Container>
      {invoice && <InvoiceView invoice={invoice} />}
    </div>
  );
}
