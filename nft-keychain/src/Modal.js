import React, {Fragment, useEffect} from 'react'
import './styles.css'

import API from "./API_Interface/API_Interface";
import Collections from "./pages/collections";


export default function  Modal({ open, onClose, userID, nftDetails, setNftDetails}) {
    if (!open) return null


    const submitHandler  = () =>{

        if(open){
            console.log("submit");
            setNftDetails(
                {
                    url: document.getElementById('url').value,
                    title: document.getElementById('title').value,
                    key: document.getElementById('key').value
                });
        }
    }

    return (
        <Fragment>
            <div className="overlay" />
            <div className="modal">
                <form onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2>ADD NFT</h2>
                        <div className="form-group">
                            <label htmlFor="name">URL to NFT:</label>
                            <input type="text" name="url" id="url" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Title:</label>
                            <input type="text" name="title" id="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Key:</label>
                            <input type="text" name="key" id="key"/>
                        </div>
                        <input type="submit" value="SUBMIT" onClick={submitHandler}/>
                        <input type="submit" value="CLOSE" onClick={onClose} />
                    </div>
                </form>
            </div>
        </Fragment>
    )
}
