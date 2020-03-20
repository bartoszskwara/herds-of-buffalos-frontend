import React from 'react';
import './LeftUpperCorner.scss';
import MenuIconButton from "../button/MenuIconButton";

class LeftUpperCorner extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        const menuItem = {
            name: "menuBar",
            icon: <i className="fas fa-bars"></i>,
            link: "/"
        };
        return (
            <div className="LeftUpperCorner">
                <MenuIconButton menuItem={menuItem} square />
            </div>
        );
    }
}

export default LeftUpperCorner;