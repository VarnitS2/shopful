import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { getPurchases, deleteOrder } from "../services/api";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  header: {},
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

function OrderItem(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [purchasesList, setPurchasesList] = React.useState([]);

  //TODO: Implement functionality to add the Purchase items in a list
  // useEffect(async () => {
  //   await getPurchases(props.order_id).then((tempArray) =>
  //     setPurchasesList(tempArray.message)
  //   );
  // }, [props.order_id]);

  const deleteThisOrder = () => {
    deleteOrder(props.order_id).then(() => props.callback());
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title={`Order # ${props.order_id}`}
        subheader={props.order_date}
      />
      <CardContent>
        {/* <List>
          <ListItem>
            <ListItemText primary="Item Id" />
            <ListItemText primary="Price" />
            <ListItemText primary="Quantity" />
          </ListItem>
        </List>
        <List>
          <Paper style={{ maxHeight: 200, overflow: "auto" }}>
            {purchasesList.map((item) => (
              <ListItem className={classes.list}>
                <ListItemText primary={item.item_id} />
                <ListItemText primary={item.price} />
                <ListItemText primary={item.quantity} />
              </ListItem>
            ))}
          </Paper>
        </List> */}

        <Typography>Total: {props.order_total}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={deleteThisOrder} size="small">
          Delete Order
        </Button>
      </CardActions>
    </Card>
  );
}

export default OrderItem;
