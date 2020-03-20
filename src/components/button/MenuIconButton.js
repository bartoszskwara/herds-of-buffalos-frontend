import React from 'react';
import './MenuIconButton.scss';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

class MenuIconButton extends React.Component {

    static propTypes = {
        menuItem: PropTypes.object,
        horizontal: PropTypes.bool,
        vertical: PropTypes.bool,
        square: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.menuItem.link);
        return (
            <NavLink to={this.props.menuItem.link} className={"MenuIconButton " + (this.props.horizontal ? 'horizontal' : '') + (this.props.vertical ? 'vertical' : '') + (this.props.square ? 'square' : '')}>
                <span className="menuIcon">
                    {this.props.menuItem.icon}
                </span>
            </NavLink>
        );
    }
}

export default MenuIconButton;