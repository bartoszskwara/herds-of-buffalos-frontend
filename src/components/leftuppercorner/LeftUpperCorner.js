import React from 'react';
import './LeftUpperCorner.scss';
import MenuIconButton from "../button/MenuIconButton";
import {menuItemsLeftUpperCorner} from "../../static/MenuIcons";

const LeftUpperCorner = () => {
    return (
        <div className="LeftUpperCorner">
            <MenuIconButton menuItem={menuItemsLeftUpperCorner} square />
        </div>
    );
}
export default LeftUpperCorner;