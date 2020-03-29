import React from 'react';
import PropTypes from 'prop-types';
import {buildingIcons} from "../../../static/BuildingIcons";
import ProgressTile from "../common/ProgressTile";

const BuildingProgress = props => {
    const buildingIconData = buildingIcons[props.progressData.building] || buildingIcons.unknown;
    const buildingIcon = React.cloneElement(
        buildingIconData.icon,
        { width: "30px", height: "30px" }
    );

    return <ProgressTile
        label={<span>{props.progressData.label} <span className="level">&ndash; level {props.progressData.nextLevel}</span></span> }
        remainingTime={props.duration}
        taskDuration={props.progressData.buildingTime}
        icon={buildingIcon} />
};

BuildingProgress.propTypes = {
    progressData: PropTypes.shape({
        building: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        nextLevel: PropTypes.number.isRequired,
        buildingTime: PropTypes.number.isRequired,
    }),
    duration: PropTypes.object.isRequired
};

export default BuildingProgress;