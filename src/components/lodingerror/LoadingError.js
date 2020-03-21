import React from 'react';
import PropTypes from 'prop-types';
import './LoadingError.scss';

const LoadingError = props => {
    return (
        <div className="LoadingError">
            <p>[{props.error}]</p>
        </div>
    );
};

LoadingError.propTypes = {
    error: PropTypes.string.isRequired
};

export default LoadingError;