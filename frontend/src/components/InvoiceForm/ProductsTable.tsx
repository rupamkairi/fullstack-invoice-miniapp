import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { productListingType, productType } from "../../interfaces/invoiceForm";

type Props = {
  products: productListingType[];
  setProducts?: Dispatch<SetStateAction<productListingType[]>>;
  updateQuantity: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: number
  ) => void;
  removeProduct: (key: number) => void;
};

export default function ProductsTable(props: Props) {
  return (
    <div>
      <div>
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
              {props.products.map((product, key) => (
                <TableRow key={key}>
                  <TableCell>
                    <Grid container>
                      <Grid item>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            props.removeProduct(key);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{product.name}</Typography>
                        <Typography variant="caption">
                          {product.code}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={product.quantity}
                      onChange={(e) => {
                        props.updateQuantity(e, key);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField disabled value={product.price} />
                  </TableCell>
                  <TableCell>
                    <TextField
                      disabled
                      value={product.quantity * product.price}
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell>
                  <TextField
                    disabled
                    value={props.products.reduce(
                      (previousValue, currentProduct) => {
                        return (
                          previousValue +
                          currentProduct.quantity * currentProduct.price
                        );
                      },
                      0
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
