import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { postNewOrder } from "../services/api";

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

  const [orderId, setorderId] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  const createNewOrder = () => {
    postNewOrder().then((tempVar) => setorderId(tempVar.message));
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      setCurrentUser(window.sessionStorage.getItem("currentUser"));
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      navigate(`/order/${orderId}`);
    }
  }, [orderId]);

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
