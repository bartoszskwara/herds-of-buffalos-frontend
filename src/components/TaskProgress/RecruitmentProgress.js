import React from 'react';
import PropTypes from 'prop-types';
import {unitIcons} from "../../static/Unit";
import ProgressTile from "../dashboard/common/ProgressTile";

const RecruitmentProgress = props => {
    const unitIconData = unitIcons[props.progressData.unit] || unitIcons.unknown;
    const unitIcon = React.cloneElement(
        unitIconData.icon,
        { width: "30px", height: "30px" }
    );

    return <ProgressTile
        label={<span>{props.progressData.label} <span className="level">&ndash; {props.progressData.amount}</span></span> }
        timeSpent={props.timeSpent}
        timeLeft={props.progressData.taskDuration}
        icon={unitIcon}
        iconLevel={props.progressData.unitLevel}
        active={props.active}
        fetchTasksProgress={props.fetchTasksProgress} />
};

RecruitmentProgress.propTypes = {
    progressData: PropTypes.shape({
        unit: PropTypes.string.isRequired,
        unitLevel: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        startDate: PropTypes.number,
        taskDuration: PropTypes.number.isRequired,
    }).isRequired,
    timeSpent: PropTypes.object,
    active: PropTypes.bool,
    fetchTasksProgress: PropTypes.func
};

export default RecruitmentProgress;