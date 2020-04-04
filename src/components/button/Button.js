import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = (props) => {
    return (
        <div className="Button">
            <button onClick={props.onClick} disabled={props.disabled}>{props.value}</button>
        </div>
    )
};

Button.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};
export default Button;