import React, { useState, useEffect } from "react";
import {
  getItemPriceHistory,
  getUserTotalSpent,
  getUserLargeOrders,
  getUserID,
} from "../services/api";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import PriceLineChart from "../components/PriceLineChart";

const useStyles = makeStyles({
  root: {
    textAlignLast: "center",
    fontSize: "52px",
  },
  header: {
    height: "50%",
  },
  midRowContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    marginTop: "100px",
  },
  getItemButtonContainer: {
    marginTop: "250px",
    marginLeft: "300px",
    textAlign: "center",
  },
  getItemButton: {
    borderRadius: "150px",
  },
  chartContainer: {
    width: "70%",
  },
  bottomRowContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    marginTop: "100px",
  },
  totalSpentContainer: {
    fontSize: "28px",
  },
  largeOrdersContainer: {
    fontSize: "28px",
    marginLeft: "200px"
  },
});

function AnalyticsPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState(-1);
  const [userTotalSpent, setUserTotalSpent] = useState(0);
  const [userLargeOrders, setUserLargeOrders] = useState(0);

  // CHANGE THIS when you add dropdown for item selection
  const [selectedItemId, setSelectedItemId] = useState(3843); // Default value 3843
  const [itemPriceHistory, setItemPriceHistory] = useState([]);

  useEffect(async () => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      var userEmail = window.sessionStorage.getItem("currentUser");
      var userId;
      setCurrentUser(userEmail);
      console.log(userEmail);

      await getUserID(userEmail).then((data) => {
        if (data.status === 200) {
          userId = data.message["user_id"];
          setCurrentUserId(userId);
        }
      });

      console.log(userId);

      await getUserTotalSpent(userId).then((data) => {
        if (data.status === 200) {
          setUserTotalSpent(data.message);
        }
      });

      await getUserLargeOrders(userId).then((data) => {
        if (data.status === 200) {
          setUserLargeOrders(data.message);
        }
      });
    }
  }, []);

  const handleGetItemButtonPressed = () => {
    getItemPriceHistory(selectedItemId).then((data) => {
      if (data.status === 200) {
        setItemPriceHistory(data.message);
      }
    });
  };

  return (
    <div>
      <Typography className={classes.root}>Analytics</Typography>

      <div className={classes.midRowContainer}>
        <div className={classes.getItemButtonContainer}>
          <Button
            className={classes.getItemButton}
            variant="outlined"
            onClick={handleGetItemButtonPressed}
          >
            Get Item
          </Button>
        </div>

        <div className={classes.chartContainer}>
          <PriceLineChart data={itemPriceHistory} />
        </div>
      </div>

      <div className={classes.bottomRowContainer}>
        <Typography className={classes.totalSpentContainer}>Total Spent: {userTotalSpent}</Typography>
        <Typography className={classes.largeOrdersContainer}>Large Orders: {userLargeOrders}</Typography>
      </div>
    </div>
  );
}

export default AnalyticsPage;
