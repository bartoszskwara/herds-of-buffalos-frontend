import React from 'react';
import PropTypes from 'prop-types';
import {buildingIcons} from "../../static/BuildingIcons";
import ProgressTile from "../dashboard/common/ProgressTile";

const BuildingProgress = props => {
    const buildingIconData = buildingIcons[props.progressData.building] || buildingIcons.unknown;
    const buildingIcon = React.cloneElement(
        buildingIconData.icon,
        { width: "30px", height: "30px" }
    );

    return <ProgressTile
        label={<span>{props.progressData.label} <span className="level">&ndash; level {props.progressData.nextLevel}</span></span> }
        timeSpent={props.timeSpent}
        timeLeft={props.progressData.taskDuration}
        icon={buildingIcon}
        active={props.active}
        type="construction"
        fetchTasksProgress={props.fetchTasksProgress}
        fetchAvailableBuildings={props.fetchAvailableBuildings}/>
};

BuildingProgress.propTypes = {
    progressData: PropTypes.shape({
        building: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        nextLevel: PropTypes.number.isRequired,
        startDate: PropTypes.number,
        taskDuration: PropTypes.number.isRequired,
    }).isRequired,
    timeSpent: PropTypes.object,
    active: PropTypes.bool,
    fetchTasksProgress: PropTypes.func
};

export default BuildingProgress;