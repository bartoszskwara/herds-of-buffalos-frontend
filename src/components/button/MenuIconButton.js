import React from 'react';
import './MenuIconButton.scss';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

const MenuIconButton = props => {
    const { menuItem, horizontal, vertical, square } = props;
    const icon = React.cloneElement(menuItem.icon, {
        width: "35px", height: "35px"
    });
    return (
        <NavLink to={menuItem.link} className={"MenuIconButton " + (horizontal ? 'horizontal' : '') + (vertical ? 'vertical' : '') + (square ? 'square' : '')}>
                <span className="menuIcon">
                    {icon}
                </span>
        </NavLink>
    );
};

MenuIconButton.propTypes = {
    menuItem: PropTypes.object,
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
    square: PropTypes.bool
};

export default MenuIconButton;