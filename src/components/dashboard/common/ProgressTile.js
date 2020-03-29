import React from 'react';
import PropTypes from 'prop-types';
import './ProgressTile.scss';
import moment from "moment";

const createTimeString = (duration) => {
    if(!duration) {
        return "";
    }
    const tempDuration = moment.duration(duration);
    const fullHours = Math.floor(tempDuration.asHours());
    tempDuration.subtract(fullHours, "h");
    const timeLeft = {
        hours: fullHours,
        minutes: tempDuration.minutes(),
        seconds: tempDuration.seconds()
    };
    return Object.keys(timeLeft).reduce((c, timeUnit) => {
        let time = timeLeft[timeUnit] || 0;
        if(time < 10 && (timeUnit === "minutes" || timeUnit === "seconds")) {
            time = "0" + time;
        }
        c += time;
        if(timeUnit !== "seconds") {
            c += ":";
        }
        return c;
    }, "");
};

const calculateProgressWidth = (remainingTime, taskDuration) => {
    return ((taskDuration - remainingTime.asMilliseconds()) * 100) / taskDuration;
};

const ProgressTile = props => {
    const icon = React.cloneElement(
        props.icon,
        { width: "30px", height: "30px" }
    );
    const time = createTimeString(props.remainingTime);
    const progressWidth = calculateProgressWidth(props.remainingTime, props.taskDuration);

    return (
        <div className="ProgressTile">
            <div className="icon">
                {icon}
            </div>
            <div className="progress-box">
                <div className="label">
                    <p>{props.label} <span className="time">&ndash; {time}</span></p>
                </div>
                <div className="progress-bar-box">
                    <div className="progress-bar" style={{width: `${progressWidth}%`}}>
                        <p>{Math.floor(progressWidth)}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProgressTile.propTypes = {
    remainingTime: PropTypes.object.isRequired,
    taskDuration: PropTypes.number.isRequired,
    icon: PropTypes.node.isRequired,
    label: PropTypes.node.isRequired
};

export default ProgressTile;