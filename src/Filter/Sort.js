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

function Sort(props) {
  const classes = useStyles();
  const [sort, setSort] = React.useState("");

  const handleSort = (event) => {
    setSort(event.target.value);
    props.sortCallback(event.target.value);
  };
  return (
    <div className="App">
      <FormControl className={classes.formControl}>
        <InputLabel>Sort</InputLabel>
        <Select value={sort} onChange={handleSort}>
          {props.sortOptions != null &&
            props.sortOptions.map((sortOption, index) => {
              return (
                <MenuItem
                  value={`${sortOption.orders[0].key}:${sortOption.orders[0].order}`}
                >
                  {sortOption.text}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
}

export default Sort;
