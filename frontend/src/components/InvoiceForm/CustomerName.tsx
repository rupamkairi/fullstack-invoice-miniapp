import {
  Autocomplete,
  createFilterOptions,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import { customerType, invoiceForm } from "../../interfaces/invoiceForm";

type nameOptionType = {
  inputValue?: string;
  computedInputValue?: string;
} & customerType;

const filter = createFilterOptions<nameOptionType>();

export default function CustomerName() {
  const { values, setFieldValue } = useFormikContext<invoiceForm>();
  const [value, setValue] = React.useState<nameOptionType | null>(null);

  return (
    <Grid container item xs={6}>
      {/* <pre>{JSON.stringify(values.customer, null, 2)}</pre> */}
      <Typography variant="h6" mb={2}>
        Select Customer
      </Typography>
      <Autocomplete
        disablePortal
        fullWidth
        options={options}
        freeSolo
        value={value}
        onChange={(event, newValue) => {
          let _value: any = {};
          if (typeof newValue === "string") {
            _value = { name: newValue };
          } else if (newValue && newValue.inputValue) {
            _value = { name: newValue.name };
          } else {
            _value = newValue;
          }

          setValue(_value);
          setFieldValue("customer", _value);
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }

          if (option.inputValue) {
            return option.computedInputValue as string;
          }

          return option.name;
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.computedInputValue ?? option.name}</li>
        )}
        renderInput={(params) => <TextField {...params} label="Customer" />}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;

          const isExisting = options.some(
            (option) => inputValue === option.name
          );

          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              computedInputValue: `Add "${inputValue}"`,
              name: `${inputValue}`,
            });
          }
          return filtered;
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
          }
        }}
      />
    </Grid>
  );
}

const options: nameOptionType[] = [
  { name: "John Doe", mobile: "8978675645" },
  { name: "Jane Dave", mobile: "9897969594" },
];
