import { Input, TextField } from "@mui/material";
import { Field, FormikProps, useFormikContext } from "formik";
import React from "react";
import { invoiceForm } from "../../interfaces/invoiceForm";

interface Props {
  label: string;
  name: string;
  required: true;
}

export default function TextBox(props: Props) {
  const { values, handleChange } = useFormikContext<invoiceForm>();

  return (
    <>
      {/* <pre>{JSON.stringify(values.invoiceNo)}</pre> */}
      <TextField
        {...props}
        fullWidth
        value={values.invoiceNo}
        onChange={handleChange}
      />
    </>
  );
}
