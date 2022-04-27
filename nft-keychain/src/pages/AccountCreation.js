import React, { useState } from "react";

function AccountCreation({CreateAccount, error}) {
    const [details, setDetails] = useState({name: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();
        CreateAccount(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Create Account</h2>
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
            </div>
        </form>
    )
}

export default AccountCreation;
