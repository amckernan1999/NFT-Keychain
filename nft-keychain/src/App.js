import React, { useState } from "react";
import './styles.css';
import UserLogin from "./pages/UserLogin";
import Collections from "./pages/collections";
import AccountCreation from "./pages/AccountCreation";
import API from './API_Interface/API_Interface.js';

function App() {

  const [b, setB] = useState("");
  const [user, setUser] = useState({name: ""});
  const [error, setError] = useState("");

  const CreateAccount = details => {
    console.log('create account', details);

    if (details.button === "CREATE ACCOUNT") {
      console.log('second create account button pressed');

      if (details.name !== "" && details.password !== "") {
        const api = new API();
        async function checkUserInfo() {
          api.checkUserInfo(details.name)
              .then( userInfo => {
                console.log('asdfasdfasgas');
                if( userInfo.status === "Success" ) {
                  console.log("Creating account")
                  api.createUserInfo(details.name, details.password, "create");
                  console.log("Logged in")
                  setB("LOGIN");
                  setUser({
                    name: details.name,
                    password: details.password
                  });
                    
                } else  {
                  console.log(userInfo, "already a user with that username");
                  setError("error-message");
                }
              });
        }
        checkUserInfo()
      } else {
        console.log('username and password cant be empty'); // TODO: need better error checking
      }

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
        console.log('first create account button pressed');
        setB("CREATE ACCOUNT");
    }
  }

  const Logout = () => {
    setUser({name: "", password: ""});
    setError("")
    console.log("Logout");
  }

  if (b === "CREATE ACCOUNT") {
    return (
      <div className="App">
        <AccountCreation CreateAccount={CreateAccount} error={error}/>;
      </div>
    )
  }
  else {
    return (
      <div className="App">
        {(user.name !== "") ? (
            <Collections Logout={Logout} error={error}/>
        ) : (
            <UserLogin Login={Login} error={error}/>
        )}
      </div>
    );
  }

}

export default App;
