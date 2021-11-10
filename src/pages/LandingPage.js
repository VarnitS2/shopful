import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    fontFamily: "BlinkMacSystemFont",
  },
  headerColumn: {
    display: "flex",
    flexDirection: "column",
  },
  budgetBuddyHeader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "300px",
    fontSize: "80px",
  },
  budgetBuddyDesc: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    fontSize: "40px",
  },
  topNavBar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  signUpButton: {
    width: "150px",
    height: "50px",
    marginTop: "30px",
    marginRight: "30px",
    borderRadius: "100px",
  },
});

function LandingPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSignUpButtonPressed = () => {
    navigate("/register");
  };

  return (
    <div className={classes.root}>
      <div className={classes.topNavBar}>
        <Button
          className={classes.signUpButton}
          variant="outlined"
          onClick={handleSignUpButtonPressed}
        >
          Sign Up
        </Button>
      </div>

      <div className={classes.headerColumn}>
        <Typography className={classes.budgetBuddyHeader}>
          Shopful
        </Typography>

        <Typography className={classes.budgetBuddyDesc}>
          Shopful description
        </Typography>
      </div>
    </div>
  );
}

export default LandingPage;
