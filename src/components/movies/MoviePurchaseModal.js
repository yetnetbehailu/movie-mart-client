import React from 'react';
import PropTypes from 'prop-types';

const PurchaseModal = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="purchase-modal-overlay">
            <div className="purchase-modal-content">
                <div className="purchase-modal-header">
                    <h5 className="purchase-modal-title">Purchase Successful</h5>
                    <button type="button" className="purchase-modal-close" onClick={onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="purchase-modal-body">
                    <p className='mb-0'>Thank you for your purchase!</p>
                </div>
            </div>
        </div>
    );
};

PurchaseModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PurchaseModal;
