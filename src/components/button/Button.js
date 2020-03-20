import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

class Button extends React.Component {

    static propTypes = {
        value: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button>{this.props.value}</button>
        );
    }
}

export default Button;