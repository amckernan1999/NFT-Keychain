import React, { useState } from "react";
import API from '../../src/API_Interface/API_Interface.js';
import Collections from './Collections.js';
import AccountCreation from "./AccountCreation.js";

function UserLogin({Login, error}) {
    const [details, setDetails] = useState({name: "", password: ""});

    const submitHandler = e => {
        console.log('submit handler', details);

        // i didn't know what the following two lines are for

        e.preventDefault();
        Login(details);

        if (true) { // TODO: if (clicked login)
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
        else if (true) { // TODO: else if (clicked create account)
            console.log('create account');
        }
    }

    return (
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
                <input type="submit" value="CREATE ACCOUNT" />
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    )
}

export default UserLogin;
