import React, { useEffect } from "react";
import { getMaxPricePurchases } from "../services/api";
import {
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlignLast: "center",
    width: "80%",
  },
  header: {
    height: "50%",
  },
  pastButton: {
    borderRadius: "100px",
  },
  list: {
    maxHeight: "100%",
    overflow: "auto",
  },
  user: {
    borderRadius: "100px",
  },
});

function AnalyticsPage() {
  const classes = useStyles();
  const [maxPricePurchases, setMaxPricePurchases] = React.useState([]);

  useEffect(() => {
    getMaxPricePurchases().then((tempArray) => {
      console.log(tempArray.message);
      setMaxPricePurchases(tempArray.message);
    });
  }, []);

  return (
    <div className={classes.root}>
      <p>These are some items bought by users at their peak selling price.</p>
      <Card>
        <List>
          <ListItem>
            <ListItemText primary="Item Id" />
            <ListItemText primary="Price" />
            <ListItemText primary="User Id" />
          </ListItem>
        </List>
        <CardContent>
          <List>
            <Paper style={{ textAlign: "-webkit-center", overflow: "auto" }}>
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
