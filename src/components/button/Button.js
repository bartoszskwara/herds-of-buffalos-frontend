import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <div className="Button">
            <button onClick={props.onClick}>{props.value}</button>
        </div>
    )
};

Button.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func
};
export default Button;