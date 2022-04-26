import React from "react";

function Collections({Logout, error}) {

    const submitHandler = e => {
        e.preventDefault();
        Logout();
    }

    return (
        <div className={"collections"}>
            <h2> COLLECTIONS PAGE</h2>
            <button onClick={Logout}>LOGOUT</button>
            <button>ADD NFT</button>
            <button>SELECT SD CARD</button>
            <button>TRANSFER</button>
        </div>
    )
}

export default Collections;