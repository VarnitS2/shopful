import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import { makeStyles } from "@material-ui/core";

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
    </div>
  );
}

export default PastOrdersPage;
