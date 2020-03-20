import React from 'react';
import './LeftPanel.scss';
import MenuIconButton from "../button/MenuIconButton";
import PropTypes from 'prop-types';

class LeftPanel extends React.Component {

    static propTypes = {
        menuItems: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const menuItems = this.props.menuItems.map(item => <li key={`menuItem-${item.name}`}><MenuIconButton menuItem={item} horizontal /></li>);
        return (
            <div className="LeftPanel">
                <ul>
                    {menuItems}
                </ul>
            </div>
        );
    }
}

export default LeftPanel;