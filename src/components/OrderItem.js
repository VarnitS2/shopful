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
} from "@mui/material";
import { getPurchases } from "../services/api";
import PurchaseItem from "./PurchaseItem";

function OrderItem(props) {
  const [purchasesList, setPurchasesList] = React.useState([]);

  useEffect(async () => {
    await getPurchases(props.order_id).then((tempArray) =>
      setPurchasesList(tempArray.message)
    );
  }, [props.order_id]);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={`Order # ${props.order_id}`}
        subheader={props.order_date}
      />
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary="Item Id" />
            <ListItemText primary="Price" />
            <ListItemText primary="Quantity" />
          </ListItem>
          {purchasesList.map((item) => (
            <div>
              <ListItem disablePadding>
                <ListItemText primary={item.item_id} />
                <ListItemText primary={item.price} />
                <ListItemText primary={item.quantity} />
              </ListItem>
            </div>
          ))}
        </List>

        <Typography>Total: {props.order_total}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Delete Order</Button>
      </CardActions>
    </Card>
  );
}

export default OrderItem;
