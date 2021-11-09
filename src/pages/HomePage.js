import React from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  createButton: {
    borderRadius: "100px",
  },
  pastButton: {
    borderRadius: "100px",
  },
  analytics: {
    borderRadius: "100px",
  },
  user: {
    borderRadius: "100px",
  },
});

function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const createNewOrder = () => {
    navigate(`/order`);
  };

  const viewPastOrder = () => {
    navigate(`/past-orders`);
  };

  const viewAnalytics = () => {
    navigate(`/analytics`);
  };

  const goToUserSetting = () => {
    navigate(`/settings`);
  };

  return (
    <div className={classes.root}>
      <h1>SHOPFUL</h1>
      <Button className={classes.createButton} onClick={createNewOrder}>
        CREATE ORDER
      </Button>
      <Button className={classes.pastButton} onClick={viewPastOrder}>
        PAST ORDERS
      </Button>
      <Button className={classes.analytics} onClick={viewAnalytics}>
        ANALYTICS
      </Button>
      <Button className={classes.user} onClick={goToUserSetting}>
        USER SETTING
      </Button>
    </div>
  );
}

export default HomePage;
