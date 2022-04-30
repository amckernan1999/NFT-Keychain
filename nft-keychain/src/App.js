import React, { useState } from "react";
import './styles.css';
import UserLogin from "./pages/UserLogin";
import Collections from "./pages/collections";
import AccountCreation from "./pages/AccountCreation";
import API from './API_Interface/API_Interface.js';

function App() {

  const [userID, setUserID] = useState("");
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
                if( userInfo.status === "Success" ) {
                  console.log("Creating account")
                  api.createUserInfo(details.name, details.password, 'create')
                  api.getUserID(details.name, 'a', 'b', 'get')
                    .then( userInfo => {
                      setUserID(userInfo.userID);
                    })
                  console.log("Logged in");
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
                      setUserID(userInfo.userID);
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

    const  SelectDevice = async () => {
        console.log("entered select");


        if ("serial" in navigator) {

            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 115200 });
            writer = port.writable.getWriter();

            //await writer.write()
            // The Web Serial API is supported.
        }
    }

    let writer;
    let port;
    const PUSH = new Uint8Array([112, 117, 115, 104]);
    const PULL = new Uint8Array([112, 117, 108, 108]);
    const REMOVE = new Uint8Array([114, 101, 109, 111, 118, 101]);

    const Transfer = async () => {
        console.log("entered transfer");
        await writer.write(PUSH);
    }

    const RemoveFromKeychain = async () => {
        console.log("entered remove");
        await writer.write(PUSH);
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
            <Collections Logout={Logout} SelectDevice={SelectDevice} Transfer={Transfer} error={error} userID={userID}/>
        ) : (
            <UserLogin Login={Login} error={error}/>
        )}
      </div>
    );
  }

}

export default App;
