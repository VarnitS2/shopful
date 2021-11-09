//TODO: Convert this page into a modal overlay
//TODO: Display top food items
//TODO: Display search bar
//TODO: Display food by category -> search query for category
//TODO: Specify price, quantity, and market (?)

import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { getItems, getMarkets } from "../services/api";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    alignContent: "space-evenly",
    flexDirection: "column",
    padding: "30px",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    float: "left",
  },
});

function AddItemPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [item, setItem] = React.useState(null);
  const [itemList, setItemList] = React.useState([]);
  const [marketList, setMarketList] = React.useState([]);

  const handleItemSelection = (event) => {
    setItem(event.target.value);
  };

  const handleMarketSelection = (event) => {
    setMarketList(event.target.value);
  };

  useEffect(() => {
    getItems().then((tempArray) => setItemList(tempArray.message));
    getMarkets().then((tempArray) => setMarketList(tempArray.message));
  }, []);

  return (
    <div className={classes.root}>
      <h1>ADD ITEM</h1>

      <div className={classes.dateContainer}>
        <Typography variant="h6">Search for an item:</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={itemList}
          sx={{ width: 300 }}
          onChange={handleItemSelection}
          getOptionLabel={(option) => option.item_name.toString()}
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
      </div>

      <Typography variant="h6">OR </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Pick a Top Item</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          value={item}
          onChange={handleItemSelection}
        >
          <FormControlLabel value="milk" control={<Radio />} label="Milk" />
          <FormControlLabel value="bread" control={<Radio />} label="Bread" />
          <FormControlLabel value="butter" control={<Radio />} label="Butter" />
        </RadioGroup>
      </FormControl>

      <div className={classes.dateContainer}>
        <Typography variant="h6">Price:</Typography>
        <TextField id="outlined" label="Price" />
      </div>

      <div className={classes.dateContainer}>
        <Typography variant="h6">Quantity:</Typography>
        <TextField id="outlined" label="Quantity" />
      </div>

      <div className={classes.dateContainer}>
        <Typography variant="h6">Pick a Market:</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={marketList}
          sx={{ width: 300 }}
          onChange={handleMarketSelection}
          getOptionLabel={(option) => option.market_name.toString()}
          renderInput={(params) => <TextField {...params} label="Market" />}
        />
      </div>

      <Button>Add Item</Button>
    </div>
  );
}

export default AddItemPage;
