import React, { useState } from "react";
import './styles.css';
import UserLogin from "./pages/UserLogin";
import Collections from "./pages/collections";
import AccountCreation from "./pages/AccountCreation";
import API from './API_Interface/API_Interface.js';

function App() {
  const adminUser = {
    name: "admin",
    password: "admin"
  }

  const [user, setUser] = useState({name: ""});
  const [error, setError] = useState("");

  const CreateAccount = details => {
    console.log(details);

    if (details.name != adminUser.name && details.password != adminUser.password)
    {
      console.log("Created account")
      setUser({
        name: details.name,
        password: details.password
      });
    } else {
      console.log("Details do not match");
      setError("error-message");
    }
  }

  const Login = details => {
    console.log(details);

    if (details.button === "LOGIN") {
      console.log('login button pressed')

      if (details.name !== "" && details.password !== "") {
          const api = new API();
          async function getUserInfo() {
              api.getUserInfo(details.name, details.password)
                  .then( userInfo => {
                      if( userInfo.status === "OK" ) {
                        console.log("Logged in")
                        setUser({
                          name: details.name,
                          password: details.password
                        });
                          
                      } else  {
                        console.log("Details do not match");
                        setError("error-message");
                      }
                  });
          }
          getUserInfo()
      }

    }
    else if (details.button === "CREATE ACCOUNT") {
        console.log('create account button pressed');
        CreateAccount(details);
    }

    // if (details.name == adminUser.name && details.password == adminUser.password)
    // {
    //   console.log("Logged in")
    //   setUser({
    //     name: details.name,
    //     password: details.password
    //   });
    // } else {
    //   console.log("Details do not match");
    //   setError("error-message");
    // }
  }

  const Logout = () => {
    setUser({name: "", password: ""});
    setError("")
    console.log("Logout");
  }

  return (
    <div className="App">
      {(user.name != "") ? (
          <Collections Logout={Logout} error={error}/>
      ) : (
          <UserLogin Login={Login} error={error}/>
      )}
    </div>
  );
}

export default App;
