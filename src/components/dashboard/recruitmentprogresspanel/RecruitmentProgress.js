import React from 'react';
import PropTypes from 'prop-types';
import {unitIcons} from "../../../static/Unit";
import ProgressTile from "../common/ProgressTile";

const RecruitmentProgress = props => {
    const unitIconData = unitIcons[props.progressData.unit] || unitIcons.unknown;
    const unitIcon = React.cloneElement(
        unitIconData.icon,
        { width: "30px", height: "30px" }
    );

    return <ProgressTile
        label={<span>{props.progressData.label} <span className="level">&ndash; {props.progressData.amount}</span></span> }
        remainingTime={props.duration}
        taskDuration={props.progressData.recruitmentTime}
        icon={unitIcon}
        iconLevel={props.progressData.unitLevel} />
};

RecruitmentProgress.propTypes = {
    progressData: PropTypes.shape({
        unit: PropTypes.string.isRequired,
        unitLevel: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        recruitmentTime: PropTypes.number.isRequired,
    }),
    duration: PropTypes.object.isRequired
};

export default RecruitmentProgress;