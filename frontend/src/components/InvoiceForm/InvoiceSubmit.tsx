import { Button, Grid } from "@mui/material";
import React from "react";

export default function InvoiceSubmit() {
  return (
    <Grid container my={4}>
      <Button type="submit" fullWidth size="large">
        Submit
      </Button>
    </Grid>
  );
}
