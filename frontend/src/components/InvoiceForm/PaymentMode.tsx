import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { invoiceForm } from "../../interfaces/invoiceForm";

export default function PaymentMode() {
  const { values, setFieldValue } = useFormikContext<invoiceForm>();
  const [modes, setModes] = useState({
    cash: true,
    cheque: true,
    card: false,
    voucher: false,
  });

  useEffect(() => {
    let _paymentModes = [];
    for (const key in modes) {
      if (modes[key]) {
        _paymentModes.push(key);
      }
    }

    setFieldValue("payments", _paymentModes);
  }, []);

  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    let _modes = {
      ...modes,
      [event.target.name]: event?.target.checked,
    };

    setModes(_modes);

    let _paymentModes = [];
    for (const key in _modes) {
      if (_modes[key]) {
        _paymentModes.push(key);
      }
    }

    setFieldValue("payments", _paymentModes);
  }

  return (
    <Grid container gap={2}>
      <FormGroup>
        <Typography variant="h6" mb={2}>
          Select Payment Modes
        </Typography>
        {/* <pre>{JSON.stringify(values.payments)}</pre> */}
        <Grid container gap={2}>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="cash"
                  checked={modes.cash}
                  onChange={handleCheck}
                />
              }
              label="Cash"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="cheque"
                  checked={modes.cheque}
                  onChange={handleCheck}
                />
              }
              label="Cheque"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="card"
                  checked={modes.card}
                  onChange={handleCheck}
                />
              }
              label="Card"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  name="voucher"
                  checked={modes.voucher}
                  onChange={handleCheck}
                />
              }
              label="Voucher"
            />
          </Grid>
        </Grid>
      </FormGroup>
      {/* <Grid container gap={2}>
        {modes.cheque && (
          <Grid container item gap={2}>
            <TextField label="Cheque Amount" variant="filled" />
            <TextField label="Cheque Details" variant="filled" />
          </Grid>
        )}
        {modes.cash && (
          <Grid container item>
            <TextField label="Cash Amount" variant="filled" />
          </Grid>
        )}
      </Grid> */}
    </Grid>
  );
}
