import React, { useState } from "react";
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import { makeStyles } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

const useStyles = makeStyles({
  root: {
    display: "flex",
    textAlign: "center",
    alignContent: "space-evenly",
    flexDirection: "column",
    padding: "30px",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    float: "left",
  },
});

// Should take in parameters specifying a json object
// Need PurchaseItem id (in case they delete it)
// All other attributes

function PurchaseItem() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Single-line item" />
      </ListItem>
    </div>
  );
}

export default PurchaseItem;
