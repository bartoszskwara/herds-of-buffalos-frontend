import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './DashboardPanel.scss';
import Button from "../../button/Button";

const DashboardPanel = props => {
    return (
        <div className="DashboardPanel">
            {props.name && <div className="panel-name">{props.name}</div>}
            <div className="panel-content">{props.panel}</div>
            { !!props.buttonLabel && <div><Button value={props.buttonLabel} /></div> }
        </div>
    );
};

DashboardPanel.propTypes = {
    name: PropTypes.string,
    panel: PropTypes.node.isRequired,
    buttonLabel: PropTypes.string
};

export default DashboardPanel;