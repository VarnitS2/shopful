import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  List,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  Autocomplete,
} from "@mui/material";
import PurchaseItem from "../components/PurchaseItem";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getMarkets, getPurchases } from "../services/api";

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

function OrderPage() {
  const { orderId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  const [orderDate, setOrderDate] = useState(new Date());
  const [marketList, setMarketList] = React.useState([]);
  const [purchasesList, setPurchasesList] = React.useState([]);

  const handleDateChange = (date) => {
    console.log(date);
    setOrderDate(date);
  };

  const addItem = () => {
    navigate(`/add-item/${orderId}`);
  };

  const handleMarketSelection = (event) => {
    setMarketList(event.target.value);
  };

  const tempJsonObj = [
    {
      itemName: "Milk",
      marketName: "County Market",
      price: 12.0,
      quantity: 1,
    },
    {
      itemName: "Milk",
      marketName: "County Market",
      price: 12.0,
      quantity: 1,
    },
    {
      itemName: "Milk",
      marketName: "County Market",
      price: 12.0,
      quantity: 1,
    },
    {
      itemName: "Milk",
      marketName: "County Market",
      price: 12.0,
      quantity: 1,
    },
  ];

  useEffect(async () => {
    await getPurchases(orderId).then((tempArray) =>
      setPurchasesList(tempArray.message)
    );

    await getMarkets().then((tempArray) => {
      setMarketList(tempArray.message);
    });
  }, []);

  return (
    <div className={classes.root}>
      <h1>NEW ORDER: {orderId.toString()} </h1>
      <div className={classes.dateContainer}>
        <Typography variant="h6">Pick a Date:</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker value={orderDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>
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

      <Grid>
        <Typography variant="h6">Purchases</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Item Id" />
            <ListItemText primary="Price" />
            <ListItemText primary="Quantity" />
          </ListItem>
          {purchasesList.map((item) => (
            <PurchaseItem itemObj={item} />
          ))}
        </List>
      </Grid>

      <Button onClick={addItem}>Add Item</Button>

      <Typography variant="h6">Total:</Typography>

      <TextField id="outlined" label="Notes" multiline rows={4} />

      <Button>Save Order</Button>
    </div>
  );
}

export default OrderPage;
