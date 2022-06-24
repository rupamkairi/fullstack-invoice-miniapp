import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as DatePickerMUI } from "@mui/x-date-pickers/DatePicker";
import { useFormikContext } from "formik";
import { invoiceForm } from "../../interfaces/invoiceForm";

export default function InvoiceDate() {
  const { values, setFieldValue } = useFormikContext<invoiceForm>();
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <pre>{JSON.stringify(values.invoiceDate)}</pre> */}
      <DatePickerMUI
        renderInput={(params) => <TextField {...params} fullWidth required />}
        label="Invoice Date"
        inputFormat="dd-MM-yyyy"
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
          setFieldValue("invoiceDate", newValue);
        }}
      />
    </LocalizationProvider>
  );
}
