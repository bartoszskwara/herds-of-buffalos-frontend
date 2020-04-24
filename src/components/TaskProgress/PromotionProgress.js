import React from 'react';
import PropTypes from 'prop-types';
import {unitIcons} from "../../static/Unit";
import ProgressTile from "../dashboard/common/ProgressTile";

const PromotionProgress = props => {
    const unitIconData = unitIcons[props.progressData.unit] || unitIcons.unknown;
    const unitIcon = React.cloneElement(
        unitIconData.icon,
        { width: "30px", height: "30px" }
    );

    return <ProgressTile
        label={<span>{props.progressData.label} <span className="level">&ndash; Level {props.progressData.level}</span></span> }
        timeSpent={props.timeSpent}
        timeLeft={props.progressData.taskDuration}
        icon={unitIcon}
        iconLevel={props.progressData.level}
        active={props.active}
        type="promotion"
        fetchTasksProgress={props.fetchTasksProgress}
        fetchAvailableUnits={props.fetchAvailableUnits} />
};

PromotionProgress.propTypes = {
    progressData: PropTypes.shape({
        unit: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        startDate: PropTypes.number,
        taskDuration: PropTypes.number.isRequired,
    }).isRequired,
    timeSpent: PropTypes.object,
    active: PropTypes.bool,
    fetchTasksProgress: PropTypes.func
};

export default PromotionProgress;