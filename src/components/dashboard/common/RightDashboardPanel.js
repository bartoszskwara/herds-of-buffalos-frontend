import React from 'react';
import PropTypes from 'prop-types';
import './RightDashboardPanel.scss';

const RightDashboardPanel = props => {
    return (
        <div className="RightDashboardPanel">
            {props.name && <div className="panel-name">{props.name}</div>}
            <div className="panel-content">{props.panel}</div>
        </div>
    );
};

RightDashboardPanel.propTypes = {
    name: PropTypes.string,
    panel: PropTypes.node.isRequired
};

export default RightDashboardPanel;