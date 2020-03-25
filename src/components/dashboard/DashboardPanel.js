import React from 'react';
import PropTypes from 'prop-types';
import './DashboardPanel.scss';

const DashboardPanel = props => {
    return (
        <div className="DashboardPanel">
            {props.name && <div className="panel-name">{props.name}</div>}
            <div className="panel-content">{props.panel}</div>
        </div>
    );
};

DashboardPanel.propTypes = {
    name: PropTypes.string,
    panel: PropTypes.node.isRequired
};

export default DashboardPanel;