import React from 'react';
import PropTypes from 'prop-types';
import './ProgressTile.scss';
import moment from "moment";
import {convertToRomanian} from "./romanianNumber";
import {levelColorsRGB} from "../../../static/Unit";

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
    const progressWidth = props.active ? calculateProgressWidth(props.remainingTime, props.taskDuration) : 0;

    return (
        <div className="ProgressTile">
            <div className="icon-wrapper">
                {icon}
                {props.iconLevel &&
                    <div className="icon-badge-wrapper">
                        <div className="icon-badge" style={{background: `rgba(${levelColorsRGB[props.iconLevel]},0.3)`}}>{convertToRomanian(props.iconLevel)}</div>
                    </div>}
            </div>
            <div className="progress-box">
                <div className="label">
                    <p>{props.label} <span className="time">&ndash; {time}</span></p>
                </div>
                <div className="progress-bar-box">
                    {props.active && <div className="progress-bar" style={{width: `${progressWidth}%`}}>
                        <p>{Math.floor(progressWidth)}%</p>
                    </div>}
                    {!props.active && <div>Pending...</div>}
                </div>
            </div>
        </div>
    );
};

ProgressTile.propTypes = {
    remainingTime: PropTypes.object,
    taskDuration: PropTypes.number,
    icon: PropTypes.node.isRequired,
    label: PropTypes.node.isRequired,
    iconLevel: PropTypes.number,
    active: PropTypes.bool
};

export default ProgressTile;