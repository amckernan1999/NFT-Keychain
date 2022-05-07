import React, { useState } from "react";
import './styles.css';
import UserLogin from "./pages/UserLogin";
import Collections from "./pages/collections";
import AccountCreation from "./pages/AccountCreation";
import API from './API_Interface/API_Interface.js';
import * as crypto from 'crypto-js';

function App() {

  const [userID, setUserID] = useState("");
  const [b, setB] = useState("");
  const [user, setUser] = useState({name: ""});
  const [error, setError] = useState("");

  let ciphertext;
  let _ciphertext;
  let hash;

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
                  
                  ciphertext = crypto.AES.encrypt(details.password, 'thisshouldbeasecret');
                  _ciphertext = crypto.AES.decrypt(ciphertext.toString(), 'thisshouldbeasecret');
                  hash = crypto.SHA1(ciphertext)
                  console.log(hash.toString());

                  api.createUserInfo(details.name, hash, 'create')
                    .then(
                  api.getUserID(details.name, 'a', 'b', 'get')
                    .then( userInfo => {
                      setUserID(userInfo.userID);
                    
                  console.log("Logged in");
                  setB("LOGIN");
                  setUser({
                    name: details.name,
                    password: hash.toString()
                  });
                }));
                } else  {
                  console.log(userInfo, "already a user with that username");
                  setError("error-message");
                }
              });
        }
        checkUserInfo()
      } else {
        console.log('username and password cant be empty'); // TODO: better error checking
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

            ciphertext = crypto.AES.encrypt(details.password, 'thisshouldbeasecret');
            _ciphertext = crypto.AES.decrypt(ciphertext.toString(), 'thisshouldbeasecret');
            hash = crypto.SHA1(ciphertext).toString()
            console.log(hash.toString());

              api.getUserInfo(details.name, hash)
                  .then( userInfo => {
                    if( userInfo.status === "OK" ) {
                      console.log("Logged in")
                      setUserID(userInfo.userID);
                      setUser({
                        name: details.name,
                        password: hash
                      });
                      console.log('login set user as:', user)
                        
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
    const api = new API();
    setUser({name: "", password: ""});
    setError("");
    setUserID("");
    console.log("Logout");
  }

  let writer;
  let port;
  const encoder = new TextEncoder();

  const  SelectDevice = async () => {
        console.log("entered select");

        if ("serial" in navigator) {

            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 115200 });
            writer = port.writable.getWriter();
            await writer.write(encoder.encode("begin"));

        }
        else{console.log("Browser does not support serial transfer");}
  }



    const Transfer = async () => {

      console.log(port);
      if(port === undefined)
      {
          await SelectDevice();
      }

      const encoder = new TextEncoder()
      const  sampleTitleKey = "Nft Title : 7cSSrwS21MLPFYHgtFvLpg==";
      console.log("entered transfer");
      await writer.write(encoder.encode("push"));
      await writer.write(encoder.encode(sampleTitleKey));
      console.log("sent" + sampleTitleKey);
      await writer.write(encoder.encode("pretend image"));

    }

    const Retrieve = async () => {
        console.log("entered retrieve");
        await writer.write(encoder.encode("pull"));

    }

    const Remove = async (nftID) => {
        console.log("entered remove");
        // console.log('nftID:', nftID);
       // await writer.write(encoder.encode("remove"));
        //await writer.write(encoder.encode(nftID));

        const api = new API();
        async function removeUserNft(rowid) {
            await api.removeUserNft(rowid);
        }

        for (let i = 0; i < nftID.length; i++) {
          await removeUserNft(nftID[i]);
        }
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
            <Collections Logout={Logout} SelectDevice={SelectDevice} Remove={Remove} Transfer={Transfer} error={error} userID={userID} user={user}/>
        ) : (
            <UserLogin Login={Login} error={error}/>
        )}
      </div>
    );
  }

}

export default App;
