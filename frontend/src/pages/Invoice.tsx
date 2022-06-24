import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm/InvoiceForm";

export default function Invoice() {
  return (
    <div>
      <Container>
        <Box mb={4}>
          <Link to={"/"}>
            <Button>Go to Home</Button>
          </Link>
        </Box>
      </Container>
      <InvoiceForm />
    </div>
  );
}
