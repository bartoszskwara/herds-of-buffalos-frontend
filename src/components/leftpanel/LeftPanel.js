import React from 'react';
import './LeftPanel.scss';
import MenuIconButton from "../button/MenuIconButton";
import PropTypes from 'prop-types';

const LeftPanel = props => {
    const menuItems = props.menuItems
        .map(item =>
            <li key={`menuItem-${item.name}`}>
                <MenuIconButton menuItem={item} horizontal />
            </li>);
    return (
        <div className="LeftPanel">
            <ul>
                {menuItems}
            </ul>
        </div>
    );
};

LeftPanel.propTypes = {
    menuItems: PropTypes.array.isRequired
};

export default LeftPanel;