import React from "react";
import { Form, Formik } from "formik";
import TextBox from "./TextBox";
import { invoiceForm } from "../../interfaces/invoiceForm";
import InvoiceSubmit from "./InvoiceSubmit";
import InvoiceDate from "./InvoiceDate";
import CustomerName from "./CustomerName";
import SearchProduct from "./SearchProduct";
import PaymentMode from "./PaymentMode";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";

export default function InvoiceForm() {
  function generateInvoiceNo(): string {
    const storedInvoiceNo = localStorage.getItem("invoiceNo");
    if (storedInvoiceNo) {
      return (parseInt(storedInvoiceNo) + 1).toString();
    } else return "1";
  }

  return (
    <div>
      <Formik<invoiceForm>
        initialValues={{
          invoiceNo: generateInvoiceNo(),
          invoiceDate: new Date(),
          customer: { name: "" },
          products: [],
          payments: [],
        }}
        onSubmit={(values, { resetForm }) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(JSON.parse(JSON.stringify(values)));
          axios.post("http://localhost:4000/", values).then((res) => {
            console.log(res);

            localStorage.setItem("invoiceNo", values.invoiceNo);
            location.reload();
          });
        }}
      >
        <Container>
          <Form>
            <Grid container gap={2}>
              <Grid container gap={2}>
                <Grid item xs={2}>
                  <TextBox
                    name="invoiceNo"
                    label="Invoice No"
                    required={true}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InvoiceDate />
                </Grid>
              </Grid>

              <CustomerName />

              <SearchProduct />

              <PaymentMode />
            </Grid>
            <InvoiceSubmit />
          </Form>
        </Container>
      </Formik>
    </div>
  );
}
