import React from 'react';

const Modal = ({ show, movieTitle, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <p className='mb-1'>Are you sure you want to delete this movie?</p>
                <p className='mb-3'>Title: {movieTitle}</p>
                <div>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;