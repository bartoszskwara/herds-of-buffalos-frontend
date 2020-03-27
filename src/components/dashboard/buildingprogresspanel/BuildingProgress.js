import React from 'react';
import PropTypes from 'prop-types';
import './BuildingProgress.scss';
import {buildingIcons} from "../../../static/BuildingIcons";

const BuildingProgress = props => {
    const buildingIconData = buildingIcons[props.progressData.building] || buildingIcons.unknown;
    const buildingIcon = React.cloneElement(
        buildingIconData.icon,
        { width: "30px", height: "30px" }
    );

    return (
        <div className="BuildingProgress">
            <div className="building-icon">
                {buildingIcon}
            </div>
            <div className="progress-box">
                <div className="building-name">
                    <p>{props.progressData.label} <span className="level">&ndash; level {props.progressData.nextLevel}</span></p>
                </div>
                <div className="progress-bar-box">
                    <div className="progress-bar" style={{width: `${props.progressData.progress}%`}}>
                        <p>{props.progressData.progress}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

BuildingProgress.propTypes = {
    progressData: PropTypes.shape({
        building: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        currentLevel: PropTypes.number,
        nextLevel: PropTypes.number.isRequired,
        progress: PropTypes.number.isRequired
    })
};

export default BuildingProgress;