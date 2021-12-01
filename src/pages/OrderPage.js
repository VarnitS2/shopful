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
  Card,
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
import {
  getMarkets,
  getPurchases,
  updateOrder,
  deleteOrder,
} from "../services/api";
import AddItemPage from "../components/AddItemPage";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    alignContent: "space-evenly",
    flexDirection: "column",
    padding: "30px",
    height: "100vh",
    fontFamily: "BlinkMacSystemFont",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    float: "left",
    marginBottom: "24px",
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
  button: {
    borderRadius: "100px",
  },
});

function OrderPage() {
  const { orderId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [marketList, setMarketList] = React.useState([]);
  const [purchasesList, setPurchasesList] = React.useState([]);
  const [marketId, setMarketId] = React.useState(null);
  const [marketName, setMarketName] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [notes, setNotes] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [closed, setClosed] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setClosed(!closed);
  };

  const handleDateChange = (date) => {
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
    var formattedDate =
      orderDate.toISOString().split("T")[0] +
      " " +
      orderDate.toTimeString().split(" ")[0];
    if (formattedDate && marketId && total) {
      updateOrder(orderId, formattedDate, marketId, notes, total).then(() =>
        navigate(`/homepage`)
      );
    }
  };

  const goBack = () => {
    deleteOrder(orderId).then(() => navigate(`/homepage`));
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      setCurrentUser(window.sessionStorage.getItem("currentUser"));
    }
  }, []);

  useEffect(async () => {
    await getPurchases(orderId).then((tempArray) =>
      setPurchasesList(tempArray.message)
    );
    await getMarkets().then((tempArray) => {
      setMarketList(tempArray.message);
    });
  }, [closed, orderId]);

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

      <div className={classes.dateContainer}>
        <Typography style={{ alignSelf: "flex-end" }} variant="h6">
          Pick a Date:
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ flexDirection: "row" }}
            value={orderDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>

        <Typography style={{ alignSelf: "flex-end" }} variant="h6">
          Pick a Market:
        </Typography>
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

      <Card>
        <Grid>
          <Typography variant="h6">Purchases</Typography>
          <List style={{ textAlignLast: "center" }}>
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
      </Card>

      <div>
        <Button onClick={handleOpen}>Add Item</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modal}>
            <AddItemPage
              orderid={orderId}
              lastItem={
                purchasesList.length > 0
                  ? purchasesList[purchasesList.length - 1]
                  : -1
              }
              onClick={handleClose}
            />
          </Box>
        </Modal>
      </div>

      <Typography variant="h6">Total: ${total} </Typography>

      <TextField
        id="outlined"
        label="Notes"
        multiline
        rows={4}
        onChange={handleNotesChange}
      />

      <div className={classes.dateContainer}>
        <Button className={classes.button} onClick={goBack}>
          Cancel
        </Button>
        <Button className={classes.button} onClick={saveOrder}>
          Save Order
        </Button>
      </div>
    </div>
  );
}

export default OrderPage;
