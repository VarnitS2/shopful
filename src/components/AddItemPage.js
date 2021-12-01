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
  Paper,
} from "@mui/material";
import {
  getItems,
  postNewPurchase,
  getFrequentItemsBought,
  getRecommendation,
} from "../services/api";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    alignContent: "space-evenly",
    flexDirection: "column",
    padding: "30px",
    fontFamily: "BlinkMacSystemFont",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
});

function AddItemPage(props) {
  const classes = useStyles();

  const [itemId, setItemId] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [freqList, setFreqList] = useState([]);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [recommendedItem, setrecommendedItem] = useState();

  const handleItemSelection = (e, val) => {
    if (val) {
      setItemId(val.item_id);
    }
  };

  const handleOtherItemSelect = (e, val) => {
    if (val) {
      setItemId(val);
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

  useEffect(async () => {
    await getItems().then((tempArray) => {
      setItemList(tempArray.message);
    });
    await getFrequentItemsBought().then((tempArray) => {
      console.log(tempArray.message);
      setFreqList(tempArray.message);
    });
    console.log(props.lastItem);
    if (props.lastItem.item_id > 0) {
      await getRecommendation(props.lastItem.item_id).then((tempObj) => {
        setrecommendedItem(tempObj.message);
        console.log(tempObj.message);
      });
    }
  }, []);

  return (
    <div className={classes.root}>
      <h2>ADD ITEM</h2>

      {recommendedItem ? (
        <div>
          <Typography style={{ textSize: "20px", color: "gray" }}>
            Because you picked {props.lastItem.item_name.split(":")[0]} we
            recommend:{" "}
          </Typography>
          <Typography variant="h6">{recommendedItem.item_name} </Typography>
        </div>
      ) : null}

      <div className={classes.dateContainer}>
        <Typography variant="h6">Search for an item:</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={itemList}
          sx={{ width: "100%" }}
          onChange={handleItemSelection}
          getOptionLabel={(option) => option.item_name}
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
      </div>

      <Typography variant="h6">OR </Typography>

      <Typography variant="h6">Pick a top item:</Typography>
      <Paper style={{ maxHeight: 200, overflow: "auto" }}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="controlled-radio-buttons-group"
            onChange={handleOtherItemSelect}
          >
            {freqList.map((item) => (
              <FormControlLabel
                value={item.item_id}
                control={<Radio />}
                label={`${item.item_name.split(":")[0]}
                :
                ${item.item_name.split(":")[1]}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>

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
