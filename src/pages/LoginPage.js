import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Link,
  Collapse,
  makeStyles,
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
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    marginTop: "150px",
    marginLeft: "80px"
  },
  loginText: {
    display: "flex",
    justifyContent: "center",
    fontSize: "40px",
    marginTop: "300px",
  },
  textFieldItemOne: {
    width: "350px",
    marginTop: "50px",
  },
  textFieldItemTwo: {
    width: "350px",
    marginTop: "10px",
  },
  loginButton: {
    width: "150px",
    height: "50px",
    marginTop: "20px",
    borderRadius: "100px",
  },
  bottomText: {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    color: "gray",
    marginTop: "388px",
  },
  linkContainer: {
    marginTop: "390.7px",
    marginLeft: "6px",
    fontSize: "20px",
    color: "gray",
  },
});

function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
  }

  const handleLoginButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        user_password: password,
      }),
    };

    fetch("/api/login/user", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          window.sessionStorage.setItem('currentUser', email);
          clearFields();
          navigate("/homepage");
        } else {
          setErrorMsg(data.message);
          setErrorFlag(true);
        }
      });
  }

  return (
    <div className={classes.root}>
      <div className={classes.displayCenter}>
        <div className={classes.displayColumn}>
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

          <Typography className={classes.loginText}>
            Login to your account
          </Typography>

          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemOne}
              label="Email"
              variant="outlined"
              onChange={handleEmailChange}
            />
          </div>
          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemTwo}
              label="Password"
              type="password"
              variant="outlined"
              onChange={handlePasswordChange}
            />
          </div>

          <div className={classes.displayCenter}>
            <Button
              className={classes.loginButton}
              variant="outlined"
              onClick={handleLoginButtonPressed}
            >
              Login
            </Button>
          </div>

          <div className={classes.displayCenter}>
            <Typography className={classes.bottomText}>
              Don't have an account? Sign up
            </Typography>

            <Link
              className={classes.linkContainer}
              href="/register"
              color="inherit"
              underline="none"
            >
              here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
