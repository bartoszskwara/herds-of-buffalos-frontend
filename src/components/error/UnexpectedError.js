import React from 'react';
import PropTypes from 'prop-types';
import './UnexpectedError.scss';

const UnexpectedError = props => {
    return (
        <div className="UnexpectedError">
            <p>{props.message}</p>
        </div>
    );
};

UnexpectedError.propTypes = {
    message: PropTypes.string.isRequired
};

export default UnexpectedError;