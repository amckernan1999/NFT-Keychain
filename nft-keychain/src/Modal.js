import React, {Fragment} from 'react'
import './styles.css'

export default function Modal({ open, onClose }) {
    if (!open) return null

    const submitHandler = e => {
        // console.log('submit handler', details);
        e.preventDefault();
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
                            <input type="text" name="url" id="url"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Title:</label>
                            <input type="text" name="title" id="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Key:</label>
                            <input type="text" name="key" id="key"/>
                        </div>
                        <input type="submit" value="SUBMIT"/>
                        <input type="submit" value="CLOSE" onClick={onClose} />
                    </div>
                </form>
            </div>
        </Fragment>
    )
}