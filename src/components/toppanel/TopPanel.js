import React from 'react';
import './TopPanel.scss';
import MenuIconButton from "../button/MenuIconButton";
import PropTypes from "prop-types";
import TopSearch from "../topsearch/TopSearch";

const TopPanel = props => {
    const menuItems = props.menuItems
        .map(item =>
            <li key={`menuItem-${item.name}`}>
                <MenuIconButton menuItem={item} vertical />
            </li>);

    return (
        <div className="TopPanel">
            <TopSearch />
            <ul>
                {menuItems}
            </ul>
        </div>
    );
};

TopPanel.propTypes = {
    menuItems: PropTypes.array.isRequired
};

export default TopPanel;