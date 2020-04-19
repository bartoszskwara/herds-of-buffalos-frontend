import React from 'react';
import './LeftUpperCorner.scss';
import MenuIconButton from "../button/MenuIconButton";
import {menuItemsLeftUpperCorner} from "../../static/MenuIcons";

class LeftUpperCorner extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="LeftUpperCorner">
                <MenuIconButton menuItem={menuItemsLeftUpperCorner} square />
            </div>
        );
    }
}

export default LeftUpperCorner;