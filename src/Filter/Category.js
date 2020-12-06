import React, { useState, useEffect } from "react";
import "../App.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Category(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState("");

  const handleCategory = (event) => {
    setCategory(event.target.value);
    props.categoryCallback(event.target.value);
  };
  return (
    <div className="App">
      <FormControl className={classes.formControl}>
        <InputLabel>Category</InputLabel>
        {props.categoryOptions?.buckets != undefined && (
          <Select value={category} onChange={handleCategory}>
            {props.categoryOptions.buckets.map((categoryOption, index) => {
              return (
                <MenuItem key={categoryOption.key} value={categoryOption.key}>
                  {categoryOption.text} {categoryOption.docCount}
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </div>
  );
}

export default Category;
