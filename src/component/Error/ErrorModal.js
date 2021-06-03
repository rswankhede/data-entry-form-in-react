import './ErrorModal.css';

import React from 'react';
const ErrorModal = (props) => {
    return (
        <div>
            <div className="backdrop" onClick={props.onConfirm}>
            </div>
            <div>
                <div className="popup">
                    <header className="header">
                        <h2>{props.title}</h2>
                    </header>
                    <div className="content">
                        <p>{props.message}</p>
                    </div>
                    <footer className="actions">
                        <button onClick={props.onConfirm}>Okay</button>
                    </footer>
                </div>

            </div>
        </div>
    )
}

export default ErrorModal;