import React from "react";
import { Form, Formik } from "formik";
import TextBox from "./TextBox";
import { invoiceForm } from "../../interfaces/invoiceForm";
import InvoiceSubmit from "./InvoiceSubmit";
import InvoiceDate from "./InvoiceDate";
import CustomerName from "./CustomerName";
import SearchProduct from "./SearchProduct";
import PaymentMode from "./PaymentMode";
import { Alert, Box, Grid, Typography } from "@mui/material";
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
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={true}
        validate={(values) => {
          const errors: any = {};

          if (!values.invoiceNo) {
            errors.invoiceNo = "Invoice No. is Required.";
          } else if (parseInt(values.invoiceNo) === NaN) {
            errors.invoiceNo = "Only Numeric Values accepted for Invoice No.";
          }

          if (!values.invoiceDate) {
            errors.invoiceDate = "Invoice Date is Required.";
          }

          if (!values.customer.name) {
            errors.customer = "Customer Name Required.";
          }

          if (!values.products.length) {
            errors.products = "Add atleast One Product.";
          }

          if (!values.payments.length) {
            errors.payment = "Add atleast One Payment Mode.";
          }

          return errors;
        }}
        onSubmit={async (values, { resetForm, validateForm }) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(await validateForm(values));
          console.log(JSON.parse(JSON.stringify(values)));
          axios.post("http://localhost:4000/", values).then((res) => {
            console.log(res);

            localStorage.setItem("invoiceNo", values.invoiceNo);
            location.reload();
          });
        }}
      >
        {({ errors }) => (
          <Container>
            {Object.keys(errors).length > 0 && (
              <Box mb={4}>
                <Alert severity="error">
                  {Object.keys(errors).map((key) => (
                    <Typography color="error" variant="body2" key={key}>
                      {errors[key]}
                    </Typography>
                  ))}
                </Alert>
              </Box>
            )}
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
        )}
      </Formik>
    </div>
  );
}
