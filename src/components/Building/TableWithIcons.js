import React from 'react';
import PropTypes from 'prop-types';
import './TableWithIcons.scss';

const TableWithIcons = (props) => {
    const items = props.items.map(i => ({
        key: i.icon.key,
        icon: React.cloneElement(i.icon.icon, { width: "23px", height: "23px"} ),
        value: i.value
    })).map(i => (
        <div className="item" key={i.key}>
            <div className="item-value">
                {i.value}
            </div>
            <div className="item-icon">
                {i.icon}
            </div>
        </div>
    ));
    return (
        <div className="TableWithIcons">
            {items}
        </div>
    );
};
TableWithIcons.propTypes = {
    items: PropTypes.array.isRequired
};

export default TableWithIcons;