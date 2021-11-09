import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import { makeStyles } from "@material-ui/core";
import OrderItem from "../components/OrderItem";
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
  const [showList, setShowList] = React.useState([null]);
  const [dateRange, setDateRange] = React.useState([null, null]);

  const createPastList = () => {
    console.log(dateRange);
    // TODO: get the list of the orders from database
    // getPastOrdersBetween(dateRange[0], dateRange[1], user_id).then((responseArray) => {
    //   setShowList(responseArray);
    // });
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
      <OrderItem order_id={3} order_date={"June 8th 2001"} order_total={100} />
      <OrderItem order_id={5} order_date={"June 9th 2001"} order_total={110} />
    </div>
  );
}

export default PastOrdersPage;
