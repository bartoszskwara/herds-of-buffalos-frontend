import React from 'react';
import './TopPanel.scss';
import MenuIconButton from "../button/MenuIconButton";
import PropTypes from "prop-types";

class TopPanel extends React.Component {

    static propTypes = {
        menuItems: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const menuItems = this.props.menuItems.map(item => <li key={`menuItem-${item.name}`}><MenuIconButton menuItem={item} vertical /></li>);
        return (
            <div className="TopPanel">
                <ul>
                    {menuItems}
                </ul>
            </div>
        );
    }
}

export default TopPanel;