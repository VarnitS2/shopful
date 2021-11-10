import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import { makeStyles } from "@material-ui/core";
import OrderItem from "../components/OrderItem";
import { useNavigate } from "react-router-dom";
import { getPastOrdersBetween } from "../services/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    alignContent: "space-evenly",
    flexDirection: "column",
    padding: "30px",
    alignItems: "center",
  },
});

function PastOrdersPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showList, setShowList] = React.useState([null]);
  const [dateRange, setDateRange] = React.useState([null, null]);

  const [orderList, setOrderList] = useState([]);

  const createPastList = async () => {
    console.log(dateRange);
    // TODO: get the list of the orders from database
    await getPastOrdersBetween(
      dateRange[0].toISOString().split("T")[0] +
        " " +
        dateRange[0].toTimeString().split(" ")[0],
      dateRange[1].toISOString().split("T")[0] +
        " " +
        dateRange[1].toTimeString().split(" ")[0],
      3
    ).then((responseArray) => {
      console.log(responseArray.message);
      setOrderList(responseArray.message);
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <h1>Pick a Date Range!</h1>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={dateRange}
            onChange={(newValue) => {
              setDateRange(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>

        <Button style={{ borderRadius: "100px" }} onClick={createPastList}>
          Show My List
        </Button>
      </div>
      {orderList ? (
        <div className={classes.root}>
          <Grid>
            {orderList.map((item) => (
              <OrderItem
                order_id={item.order_id}
                order_date={item.purchase_date}
                order_total={item.total_spent}
              />
            ))}
          </Grid>
        </div>
      ) : null}
    </div>
  );
}

export default PastOrdersPage;
