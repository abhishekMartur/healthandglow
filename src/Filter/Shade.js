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

function Shade(props) {
  console.log(props.shadeOptions);
  const classes = useStyles();
  const [shade, setShade] = React.useState("");

  const handleShade = (event) => {
    setShade(event.target.value);
    props.shadeCallback(event.target.value);
  };
  return (
    <div className="App">
      <FormControl className={classes.formControl}>
        <InputLabel>Shade</InputLabel>
        {props.shadeOptions.buckets != undefined && (
          <Select value={shade} onChange={handleShade}>
            {props.shadeOptions.buckets.map((shadeOption, index) => {
              return (
                <MenuItem key={shadeOption.key} value={shadeOption.key}>
                  {shadeOption.text} {shadeOption.docCount}
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </div>
  );
}

export default Shade;
