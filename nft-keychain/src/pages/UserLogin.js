import React, { useState } from "react";
import API from '../../src/API_Interface/API_Interface.js';
import Collections from './collections.js';
import AccountCreation from "./AccountCreation.js";

function UserLogin({Login, error}) {
    const [details, setDetails] = useState({name: "", password: "", button: ""});

    const submitHandler = e => {
        // console.log('submit handler', details);
        e.preventDefault();
        // Login(details);

        if (details.button === "LOGIN") { // TODO: if (clicked login)
            console.log('login button pressed')

            if (details.name !== "" && details.password !== "") {
                const api = new API();
                async function getUserInfo() {
                    api.getUserInfo(details.name, details.password)
                        .then( userInfo => {
                            if( userInfo.status === "OK" ) {
                                console.log('success');
                            } else  {
                                console.log('failure')
                            }
                        });
                }
    
                getUserInfo()
            }

        }
        else if (details.button === "CREATE ACCOUNT") { // TODO: else if (clicked create account)
            console.log('create account button pressed');
        }
    }

    return (
        <div className="background">
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>NFT Keychain</h2>
                    {(error !== "") ? ( <div className={error}>Invalid username or password.</div> ) : ""}
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Password:</label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                    </div>
                    <input type="submit" value="LOGIN" onClick={e => setDetails({...details, button: e.target.value})} button={details.value} />
                    <input type="submit" value="CREATE ACCOUNT" onClick={e => setDetails({...details, button: e.target.value})} button={details.value} />
                </div>
            </form>
        </div>
    )
}

export default UserLogin;
