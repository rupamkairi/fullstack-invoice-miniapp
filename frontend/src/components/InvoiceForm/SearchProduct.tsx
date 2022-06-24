import { Grid, TextField, Typography } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useFormikContext } from "formik";
import React, { ChangeEvent, useState } from "react";
import {
  invoiceForm,
  productListingType,
  productType,
} from "../../interfaces/invoiceForm";
import ProductsTable from "./ProductsTable";

type productOptionType = {
  inputValue?: string;
} & productType;

export default function SearchProduct() {
  const { values, setFieldValue } = useFormikContext<invoiceForm>();
  const [value, setValue] = useState<productOptionType | null>(null);

  const [products, setProducts] = useState<productListingType[]>([]);
  const [updateIdentifierCode, setUpdateIdentifierCode] = useState("");

  function addToProductLists(product: productType) {
    if (!products.length) {
      const _products = [{ ...product, quantity: 1 }];

      setProducts([..._products]);
      setFieldValue("products", _products);
    } else {
      const _products = products;
      let found = false;
      _products.forEach((el) => {
        if (el.code === product.code) {
          setUpdateIdentifierCode(el.code);
          el.quantity++;
          found = true;
        }
      });

      !found && _products.push({ ...product, quantity: 1 });

      setProducts([..._products]);
      setFieldValue("products", _products);
    }
  }

  function updateQuantity(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: number
  ) {
    const _products = products;

    _products[key].quantity = event.target.value
      ? parseInt(event.target.value)
      : 0;

    setProducts([..._products]);
    setFieldValue("products", _products);
  }

  function removeProduct(key: number) {
    const _products = products;
    _products.splice(key, 1);

    setProducts([..._products]);
    setFieldValue("products", _products);
  }

  return (
    <Grid container>
      <Grid container item xs={6}>
        <Typography variant="h6" mb={2}>
          Add Products
        </Typography>
        <Autocomplete
          fullWidth
          disablePortal
          options={options}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            addToProductLists(newValue as productType);
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Product" value={value} required />
          )}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
        />
      </Grid>
      {/* <Grid container item>
        <pre>{JSON.stringify(values.products, null, 2)}</pre>
      </Grid> */}

      <Grid container>
        <Typography variant="h6" mt={2} mb={2}>
          Products
        </Typography>
        {products.length > 0 && (
          <Grid container item xs={12}>
            <ProductsTable
              products={products}
              updateQuantity={updateQuantity}
              removeProduct={removeProduct}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const options: productOptionType[] = [
  { name: "1984", author: "George Orwell", code: "1984-GO", price: 399 },
  { name: "Homo Deus", author: "Yuval N. Harari", code: "HD-YNH", price: 499 },
  {
    name: "12 Rules for Life",
    author: "Jordan Peterson",
    code: "12RFL-JP",
    price: 499,
  },
  {
    name: "Tools of Titans",
    author: "Tim Ferris",
    code: "TOT-TF",
    price: 999,
  },
];
