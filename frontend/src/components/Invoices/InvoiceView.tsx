import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { invoiceForm } from "../../interfaces/invoiceForm";

type Prop = {
  invoice: invoiceForm;
};

export default function InvoiceView({ invoice }: Prop) {
  function dateParser(date: string) {
    return Date(date);
  }

  return (
    <Paper>
      <Box padding={4}>
        <Typography>Invoice No.: {invoice.invoiceNo}</Typography>
        <Typography>
          Invoice Date: {dateParser(invoice.invoiceDate as any)}
        </Typography>
        <Typography>Customer: {invoice.customer.name}</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.products.map((product, key) => (
                <TableRow key={key}>
                  <TableCell>
                    <Grid container>
                      <Grid item>
                        <Typography variant="body1">{product.name}</Typography>
                        <Typography variant="caption">
                          {product.code}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{product.quantity}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{product.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {product.quantity * product.price}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Typography>Total</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell>
                  <Typography variant="body1">
                    {invoice.products.reduce(
                      (previousValue, currentProduct) => {
                        return (
                          previousValue +
                          currentProduct.quantity * currentProduct.price
                        );
                      },
                      0
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography mt={2}>Payment Supported by: </Typography>
        <List>
          {invoice.payments.map((mode, key) => (
            <ListItem key={key}>
              <Typography variant="button">{mode.toUpperCase()}</Typography>
            </ListItem>
          ))}
        </List>

        <Box>
          <Link to={`/invoice/${invoice.invoiceNo}`}>
            <Button>See this Invoice only</Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}
