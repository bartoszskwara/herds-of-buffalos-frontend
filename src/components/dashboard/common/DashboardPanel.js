import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './DashboardPanel.scss';
import Button from "../../button/Button";

const DashboardPanel = props => {
    const {fixedHeight} = props;
    return (
        <div className="DashboardPanel">
            {props.name && <div className="panel-name">{props.name}</div>}
            <div className="panel-content" style={fixedHeight ? {minHeight: "400px"} : {}}>{props.panel}</div>
            { !!props.buttonLabel && <div><Button value={props.buttonLabel} onClick={props.onClick}/></div> }
        </div>
    );
};

DashboardPanel.propTypes = {
    name: PropTypes.string,
    panel: PropTypes.node.isRequired,
    buttonLabel: PropTypes.string,
    fixedHeight: PropTypes.bool,
    onClick: PropTypes.func
};

export default DashboardPanel;