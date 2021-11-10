import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Collapse,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  root: {
    fontFamily: "BlinkMacSystemFont",
  },
  displayColumn: {
    display: "flex",
    flexDirection: "column",
  },
  displayCenter: {
    display: "flex",
    justifyContent: "center",
  },
  alertContainer: {
    position: "absolute",
    marginTop: "280px",
  },
  backButton: {
    position: "absolute",
    width: "150px",
    height: "50px",
    marginTop: "30px",
    marginLeft: "30px",
    borderRadius: "100px",
  },
  settings: {
    marginTop: "20px",
    fontSize: "60px",
  },
  currentUserText: {
    marginTop: "200px",
    fontSize: "30px",
  },
  signOutButton: {
    width: "200px",
    height: "50px",
    marginTop: "200px",
    borderRadius: "100px",
  },
  deleteAccountButton: {
    width: "200px",
    height: "50px",
    marginTop: "500px",
    borderRadius: "100px",
    color: "red",
  },
  passwordContainer: {
    position: "absolute",
    marginTop: "360px",
  },
  passwordText: {
    marginTop: "20px",
  },
});

function UserSettingsPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");
  const [deleteAccountFlag, setDeleteAccountFlag] = useState(false);
  const [password, setPassword] = useState("");

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      setCurrentUser(window.sessionStorage.getItem("currentUser"));
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBackButtonPressed = () => {
    navigate("/homepage");
  };

  const handleSignOutButtonPressed = () => {
    window.sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleDeleteAccountButtonPressed = () => {
    if (deleteAccountFlag) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser,
          user_password: password,
        }),
      };

      fetch("/api/delete/user", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            navigate("/");
          } else {
            setErrorMsg(data.message);
            setErrorFlag(true);
          }
        });
    } else {
      setDeleteAccountFlag(true);
    }
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.backButton}
        variant="outlined"
        onClick={handleBackButtonPressed}
      >
        Back
      </Button>
      <div className={classes.displayCenter}>
        <Typography className={classes.settings}>Settings</Typography>
      </div>

      <div className={classes.displayCenter}>
        <Typography className={classes.currentUserText}>
          Currently logged in as: {currentUser}
        </Typography>
      </div>

      <div className={classes.displayCenter}>
        <Button
          className={classes.signOutButton}
          variant="outlined"
          onClick={handleSignOutButtonPressed}
        >
          Sign out
        </Button>
      </div>

      <div className={classes.displayCenter}>
        <Collapse className={classes.alertContainer} in={errorFlag}>
          <Alert
            severity="error"
            onClose={() => {
              setErrorMsg("");
              setErrorFlag(false);
            }}
          >
            {errorMsg}
          </Alert>
        </Collapse>
      </div>

      <div className={classes.displayCenter}>
        <Collapse className={classes.passwordContainer} in={deleteAccountFlag}>
          <Typography>Type in your password:</Typography>
          <TextField
            className={classes.passwordText}
            label="Password"
            type="password"
            variant="outlined"
            onChange={handlePasswordChange}
          />
        </Collapse>
      </div>

      <div className={classes.displayCenter}>
        <Button
          className={classes.deleteAccountButton}
          variant="outlined"
          onClick={handleDeleteAccountButtonPressed}
        >
          {deleteAccountFlag ? "Confirm" : "Delete Account"}
        </Button>
      </div>
    </div>
  );
}

export default UserSettingsPage;
