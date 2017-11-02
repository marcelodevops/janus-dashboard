import React from 'react';
import PropTypes from 'prop-types';
import Modaliz from 'react-modaliz';

import block from '../../../helpers/bem-cn';

import Button from '../../buttons/Button';

const propTypes = {
    className: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    redirectOnClose: PropTypes.func,
    statusText: PropTypes.string.isRequired,
};

const defaultProps = {
    message: '',
    statusText: '',
};

const b = block('j-confirmation');

const APIRespondModal = ({
    className,
    closeModal,
    isOpen,
    message,
    redirectOnClose,
    statusText,
}) => {
    const handleClose = () => {
        closeModal();

        if (redirectOnClose) {
            redirectOnClose();
        }
    };

    return (
        <Modaliz
            className={b()}
            show={isOpen}
            speed={500}
            onClose={handleClose}
            discardDefaults
        >
            <div className={b('inner')}>
                <div className={b('title')}>
                    Ooops
                </div>
                <div className={b('body')}>
                    <div className={b('text')}>
                        {message}
                    </div>
                </div>
            </div>
            <div className={b('buttons-group').mix('j-buttons__wrapper')}>
                <Button mod="default" onClick={handleClose}>Close</Button>
            </div>
        </Modaliz>
    );
};

APIRespondModal.propTypes = propTypes;
APIRespondModal.defaultProps = defaultProps;

export default APIRespondModal;
