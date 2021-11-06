import userEvent from "@testing-library/user-event";
import React, {useState} from "react";
import LoginForm from "../components/loginform.js";

function UserPage() {
  const admin = {
    email: "user@gmail.com",
    password: "password"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if(details.email == admin.email && details.password == admin.password)
    {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      });
    }
    else
    {
      console.log("Details do not match");
    }
  }

  const Logout = () => {
    console.log("Logout");
    setUser({
      name: "",
      email: ""
    });
  }
  return (
    <div>
      <h1>HELLO THIS IS THE USER PAGE!</h1>
      <p>
        We need the ability to login as a user, sign up (insert user) and delete
        the user (they can delete their account), and sign out? We need a saved
        state of the user so that the orders can be created under each user (FK)
        COVERS: create + delete *Will authentication stuff get tricky?
      </p>

      {(user.email != "") ? (
          <div className="Welcome">
            <h2>Welcome, <span>{user.name}</span></h2>
            <button onClick={Logout}>Logout</button>
          </div>
        ) : (
          <LoginForm Login={Login} Error={error}/>
        )}

    </div>
  );
}

export default UserPage;
