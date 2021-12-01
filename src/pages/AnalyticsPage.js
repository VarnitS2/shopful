import React, { useState, useEffect } from "react";
import {
  getItemPriceHistory,
  getUserTotalSpent,
  getUserLargeOrders,
  getUserID,
  getMaxPricePurchases,
  getItems,
} from "../services/api";
import {
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Paper,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import PriceLineChart from "../components/PriceLineChart";

const useStyles = makeStyles({
  root: {
    textAlignLast: "center",
    fontSize: "52px",
    textAlign: "center",
  },
  header: {
    height: "50%",
  },
  midRowContainer: {
    display: "flex",
    padding: "10px",
    marginTop: "100px",
  },
  getItemButtonContainer: {
    marginTop: "250px",
    textAlign: "center",
  },
  getItemButton: {
    borderRadius: "150px",
  },
  chartContainer: {
    width: "50%",
  },
  bottomRowContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    marginTop: "100px",
    justifyContent: "space-evenly",
  },
  totalSpentContainer: {
    fontSize: "28px",
  },
  largeOrdersContainer: {
    fontSize: "28px",
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

function AnalyticsPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState(-1);
  const [userTotalSpent, setUserTotalSpent] = useState(0);
  const [userLargeOrders, setUserLargeOrders] = useState(0);
  const [maxPricePurchases, setMaxPricePurchases] = React.useState([]);
  const [itemList, setItemList] = useState([]);

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
      await getItems().then((tempArray) => {
        setItemList(tempArray.message);
      });

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
      await getMaxPricePurchases().then((tempArray) => {
        console.log(tempArray.message);
        setMaxPricePurchases(tempArray.message);
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
  const handleBackButtonPressed = () => {
    navigate("/homepage");
  };

  const handleItemSelection = (e, val) => {
    if (val) {
      setSelectedItemId(val.item_id);
    }
  };

  return (
    <div>
      <Button className={classes.backButton} onClick={handleBackButtonPressed}>
        Back
      </Button>
      <Typography className={classes.root}>Analytics</Typography>

      <div className={classes.midRowContainer}>
        <div className={classes.getItemButtonContainer}>
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
          <Button
            className={classes.getItemButton}
            variant="outlined"
            onClick={handleGetItemButtonPressed}
          >
            Get Graph
          </Button>
        </div>

        <div className={classes.chartContainer}>
          <PriceLineChart data={itemPriceHistory} />
        </div>
      </div>

      <div className={classes.bottomRowContainer}>
        <Typography className={classes.totalSpentContainer}>
          Total Spent: {userTotalSpent}
        </Typography>
        <Typography className={classes.largeOrdersContainer}>
          Large Orders: {userLargeOrders}
        </Typography>
      </div>

      <p style={{ textAlign: "center" }}>
        These are some items bought by users at their peak selling price.
      </p>
      <Card>
        <List style={{ textAlignLast: "center", overflow: "auto" }}>
          <ListItem>
            <ListItemText primary="Item Id" />
            <ListItemText primary="Price" />
            <ListItemText primary="User Id" />
          </ListItem>
        </List>
        <CardContent>
          <List>
            <Paper style={{ textAlignLast: "center", overflow: "auto" }}>
              {maxPricePurchases.map((item) => (
                <ListItem className={classes.list}>
                  <ListItemText primary={item.item_id} />
                  <ListItemText primary={item.price} />
                  <ListItemText primary={item.user_id} />
                </ListItem>
              ))}
            </Paper>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsPage;
