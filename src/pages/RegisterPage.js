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
    marginLeft: "33px",
  },
  signUpText: {
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
  signUpButton: {
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
    marginTop: "260px",
  },
  linkContainer: {
    marginTop: "262px",
    marginLeft: "6px",
    fontSize: "20px",
    color: "gray",
  },
});

function RegisterPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [age, setAge] = useState(0);

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRePassword("");
  };

  const handleSignUpButtonPressed = () => {
    if (password !== rePassword) {
      setErrorMsg("Passwords don't match");
      setErrorFlag(true);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        user_password: password,
        age: age
      }),
    };

    fetch("/api/add/user", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          window.sessionStorage.setItem("currentUser", email);
          clearFields();
          navigate("/homepage");
        } else {
          setErrorMsg(data.message);
          setErrorFlag(true);
        }
      });
  };

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

          <Typography className={classes.signUpText}>
            Create a new account
          </Typography>

          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemOne}
              label="Username"
              variant="outlined"
              onChange={handleUsernameChange}
            />
          </div>
          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemTwo}
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
            <TextField
              className={classes.textFieldItemTwo}
              label="Re-enter Password"
              type="password"
              variant="outlined"
              onChange={handleRePasswordChange}
            />
          </div>
          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemTwo}
              label="Age"
              type="number"
              variant="outlined"
              onChange={handleAgeChange}
            />
          </div>

          <div className={classes.displayCenter}>
            <Button
              className={classes.signUpButton}
              variant="outlined"
              onClick={handleSignUpButtonPressed}
            >
              Sign Up
            </Button>
          </div>

          <div className={classes.displayCenter}>
            <Typography className={classes.bottomText}>
              Already have an account? Login
            </Typography>

            <Link
              className={classes.linkContainer}
              href="/login"
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

export default RegisterPage;
