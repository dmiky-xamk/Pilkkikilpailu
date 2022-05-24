import classes from "./RadioButtons.module.css";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const CATEGORIES = [
  {
    value: "Alle 15 vuotiaat",
  },
  {
    value: "15 – 19 vuotiaat",
  },
  {
    value: "20 – 39 vuotiaat",
  },
  {
    value: "40 – 59 vuotiaat",
  },
  {
    value: "60 – 69 vuotiaat",
  },
  {
    value: "70 – 79 vuotiaat",
  },
  {
    value: "yli 80 vuotiaat",
  },
];

export default function RadioButtons(props) {
  const choices = CATEGORIES.map((category) => (
    <FormControlLabel
      key={Math.random().toString()}
      value={category.value}
      label={category.value}
      control={<Radio />}
    />
  ));

  return (
    <FormControl className={classes.radio} error={Boolean(props.errorMessage)}>
      <FormLabel id="category-label">Ikäsarja johon osallistut</FormLabel>
      <RadioGroup
        name={props.name}
        aria-labelledby="category-label"
        defaultValue=""
        onChange={props.onChange}
      >
        {choices}
      </RadioGroup>
      <FormHelperText>{props.errorMessage}</FormHelperText>
    </FormControl>
  );
}
