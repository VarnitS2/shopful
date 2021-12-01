import React, { useState, useEffect } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import { Button } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import { makeStyles } from "@material-ui/core";
import OrderItem from "../components/OrderItem";
import { useNavigate } from "react-router-dom";
import { getPastOrdersBetween, getUserID } from "../services/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    alignContent: "space-evenly",
    flexDirection: "column",
    padding: "30px",
    alignItems: "center",
    fontFamily: "BlinkMacSystemFont",
  },
  root2: {
    display: "flex",
    width: "100%",
    padding: "30px",
    justifyContent: "center",
  },
  backButton: {
    borderRadius: "100px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    color: "black",
    margin: "20px",
    width: "150px",
    height: "50px",
  },
});

function PastOrdersPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState(-1);
  const [dateRange, setDateRange] = React.useState([null, null]);

  const [orderList, setOrderList] = useState(null);
  const [buttonFlag, setButtonFlag] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      var userEmail = window.sessionStorage.getItem("currentUser");
      setCurrentUser(userEmail);

      getUserID(userEmail).then((data) => {
        if (data.status === 200) {
          setCurrentUserId(data.message["user_id"]);
        }
      });
    }
  }, []);

  const createPastList = async () => {
    setButtonFlag(true);
    // TODO: get the list of the orders from database
    await getPastOrdersBetween(
      dateRange[0].toISOString().split("T")[0] +
        " " +
        dateRange[0].toTimeString().split(" ")[0],
      dateRange[1].toISOString().split("T")[0] +
        " " +
        dateRange[1].toTimeString().split(" ")[0],
      currentUserId
    ).then((response) => {
      if (response.status === 200) {
        setOrderList(response.message);
      } else {
        setOrderList(null);
      }
    });
  };
  const handleBackButtonPressed = () => {
    navigate("/homepage");
  };

  return (
    <div>
      <Button className={classes.backButton} onClick={handleBackButtonPressed}>
        Back
      </Button>
      <div className={classes.root}>
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
        <div className={classes.root2}>
          <Grid
            style={{
              display: "grid",
              gridAutoFlow: "column",
              columnGap: "20px",
            }}
          >
            {orderList.map((item) => (
              <OrderItem
                order_id={item.order_id}
                order_date={item.purchase_date}
                order_total={item.total_spent}
              />
            ))}
          </Grid>
        </div>
      ) : buttonFlag ? (
        <div className={classes.root}>
          <Typography>No orders in this date range</Typography>
        </div>
      ) : null}
    </div>
  );
}

export default PastOrdersPage;
