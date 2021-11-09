import React from "react";
import { ListItem, IconButton, ListItemText } from "@mui/material";
import { deletePurchase } from "../services/api";
import { makeStyles } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    alignContent: "space-evenly",
    flexDirection: "column",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    float: "left",
  },
});

function PurchaseItem(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const deleteItem = () => {
    deletePurchase(props.itemObj.purchase_id).then(() => navigate(0));
  };
  return (
    <div className={classes.root}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemText primary={props.itemObj.item_id} />
        <ListItemText primary={props.itemObj.price} />
        <ListItemText primary={props.itemObj.quantity} />
      </ListItem>
    </div>
  );
}

export default PurchaseItem;
