import React, {useEffect, useState} from 'react';
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

const calculateProgressWidth = (timeSpent, timeLeft) => {
    return ((timeSpent.asMilliseconds()) * 100) / (timeSpent.asMilliseconds() + timeLeft);
};

const ProgressTile = props => {
    const {active, timeSpent, timeLeft, iconLevel, icon, label, fetchTasksProgress} = props;
    const [timeState, setTimeSpentState] = useState({
        timeSpent: timeSpent,
        timeLeft: moment.duration(timeLeft),
        progressWidth: calculateProgressWidth(timeSpent, timeLeft)
    });

    useEffect(() => {
        let interval;
        if(active) {
            interval = setInterval(() => {
                setTimeSpentState(prevState => {
                    const timeSpent = prevState.timeSpent.add(1, 's');
                    let timeLeft = prevState.timeLeft.subtract(1, 's');
                    if(timeLeft.asMilliseconds() <= 0) {
                        timeLeft = moment.duration(0);
                    }
                    const progressWidth = calculateProgressWidth(timeSpent, timeLeft);
                    return {
                        timeSpent,
                        timeLeft,
                        progressWidth
                    }
                });
            }, 1000);
        }
        return () => interval ? clearInterval(interval) : undefined;
    }, [active]);

    useEffect(() => {
        if(timeState.timeLeft <= 0) {
            fetchTasksProgress();
        }
    }, [timeState]);

    const itemIcon = React.cloneElement(
        icon,
        { width: "30px", height: "30px" }
    );
    return (
        <div className="ProgressTile">
            <div className="icon-wrapper">
                {itemIcon}
                {iconLevel &&
                    <div className="icon-badge-wrapper">
                        <div className="icon-badge" style={{background: `rgba(${levelColorsRGB[iconLevel]},0.3)`}}>{convertToRomanian(iconLevel)}</div>
                    </div>}
            </div>
            <div className="progress-box">
                <div className="label">
                    <p>{label} <span className="time">&ndash; {createTimeString(timeState.timeLeft)}</span></p>
                </div>
                <div className="progress-bar-box">
                    {active && <div className="progress-bar" style={{width: `${timeState.progressWidth}%`}}>
                        <p>{Math.floor(timeState.progressWidth)}%</p>
                    </div>}
                    {!active && <div>Pending...</div>}
                </div>
            </div>
        </div>
    );
};

ProgressTile.propTypes = {
    timeSpent: PropTypes.object,
    startDate: PropTypes.number,
    timeLeft: PropTypes.number,
    icon: PropTypes.node.isRequired,
    label: PropTypes.node.isRequired,
    iconLevel: PropTypes.number,
    active: PropTypes.bool,
    fetchTasksProgress: PropTypes.func
};

export default ProgressTile;