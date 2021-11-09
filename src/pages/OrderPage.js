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
  Box,
  Modal,
} from "@mui/material";
import PurchaseItem from "../components/PurchaseItem";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getMarkets, getPurchases, updateOrder } from "../services/api";
import AddItemPage from "../components/AddItemPage";

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
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
});

function OrderPage() {
  const { orderId } = useParams();
  const classes = useStyles();

  const [orderDate, setOrderDate] = useState(new Date());
  const [marketList, setMarketList] = React.useState([]);
  const [purchasesList, setPurchasesList] = React.useState([]);
  const [marketId, setMarketId] = React.useState(null);
  const [marketName, setMarketName] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [notes, setNotes] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (date) => {
    console.log(date);
    setOrderDate(date);
  };

  const handleNotesChange = (e) => setNotes(e.target.value);

  const handleMarketSelection = (e, val) => {
    if (val) {
      setMarketName(val.market_name);
      setMarketId(val.market_id);
    }
  };

  const saveOrder = () => {
    // updateOrder(orderDate, marketId, notes, total)
    console.log(orderDate, marketId, notes, total);
  };

  useEffect(() => {
    async function getPurchasesData() {
      await getPurchases(orderId).then((tempArray) =>
        setPurchasesList(tempArray.message)
      );
    }
    getPurchasesData();

    async function getMarketsData() {
      await getMarkets().then((tempArray) => {
        setMarketList(tempArray.message);
      });
    }
    getMarketsData();
  }, [open, orderId]);

  useEffect(() => {
    var tempVar = 0;
    purchasesList.map((item) => {
      tempVar += item.price * item.quantity;
    });
    setTotal(tempVar);
  }, [purchasesList]);

  return (
    <div className={classes.root}>
      <h1>NEW ORDER: {orderId.toString()} </h1>

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

      <div>
        <Button onClick={handleOpen}>Add Item</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modal}>
            <AddItemPage orderid={orderId} onClick={handleClose} />
          </Box>
        </Modal>
      </div>

      <Typography variant="h6">Total: ${total} </Typography>

      <div className={classes.dateContainer}>
        <Typography variant="h6">Pick a Date:</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker value={orderDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>

        <Typography variant="h6">Pick a Market:</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={marketList}
          val={marketName}
          sx={{ width: 300 }}
          onChange={handleMarketSelection}
          getOptionLabel={(option) => option.market_name}
          renderInput={(params) => <TextField {...params} label="Market" />}
        />
      </div>

      <TextField
        id="outlined"
        label="Notes"
        multiline
        rows={4}
        onChange={handleNotesChange}
      />

      <Button onClick={saveOrder}>Save Order</Button>
    </div>
  );
}

export default OrderPage;
