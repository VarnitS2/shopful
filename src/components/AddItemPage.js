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
import { getItems, postNewPurchase } from "../services/api";
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

function AddItemPage(props) {
  const classes = useStyles();

  const [itemId, setItemId] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const handleItemSelection = (e, val) => {
    if (val) {
      setItemId(val.item_id);
    }
  };
  const updatePrice = (e) => setPrice(e.target.value);
  const updateQuantity = (e) => setQuantity(e.target.value);

  const sumbitItem = () => {
    if (props.orderid && itemId && price && quantity) {
      postNewPurchase(props.orderid, itemId, price, quantity).then(() =>
        props.onClick()
      );
    }
  };

  useEffect(() => {
    getItems().then((tempArray) => {
      setItemList(tempArray.message);
    });
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
          getOptionLabel={(option) => option.item_name}
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
      </div>

      <Typography variant="h6">OR </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Pick a Top Item</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          value={itemId}
          onChange={handleItemSelection}
        >
          <FormControlLabel value="milk" control={<Radio />} label="Milk" />
          <FormControlLabel value="bread" control={<Radio />} label="Bread" />
          <FormControlLabel value="butter" control={<Radio />} label="Butter" />
        </RadioGroup>
      </FormControl>

      <div className={classes.dateContainer}>
        <Typography variant="h6">Price:</Typography>
        <TextField id="outlined" label="Price" onChange={updatePrice} />
      </div>

      <div className={classes.dateContainer}>
        <Typography variant="h6">Quantity:</Typography>
        <TextField id="outlined" label="Quantity" onChange={updateQuantity} />
      </div>

      <Button onClick={sumbitItem}>Add Item</Button>
    </div>
  );
}

export default AddItemPage;
