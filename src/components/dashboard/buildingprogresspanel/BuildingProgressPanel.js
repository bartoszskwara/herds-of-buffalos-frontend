import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './BuildingProgressPanel.scss';
import LoadingError from "../../error/LoadingError";
import Loader from "../../loader/Loader";
import BuildingProgress from "./BuildingProgress";
import moment from "moment";

const BuildingProgressPanel = props => {
    const [loading, isLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft => {
                return timeLeft.map(t => {
                    const newDuration = t.active ? t.duration.subtract(1, 's') : t.duration;
                    return {
                        ...t,
                        duration: newDuration.asMilliseconds() < 0 ? moment.duration(0) : newDuration,
                        active: newDuration.asMilliseconds() > 0
                    }
                });
            });
        }, 1000);
        return () => clearTimeout(interval);
    }, []);

    useEffect(() => {
        if(props.buildingProgressData) {
            isLoading(false);
            props.buildingProgressData.forEach(data => {
                const duration = moment.duration(moment(data.endDate).diff(moment()));
                setTimeLeft(timeLeft => {
                    timeLeft.push({
                        building: data.building,
                        duration: duration,
                        active: duration.asMilliseconds() > 0
                    });
                    return timeLeft;
                });
            });
        }
    }, [props.buildingProgressData]);

    if(props.error) {
        return <div className="BuildingProgressPanel"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="BuildingProgressPanel"><Loader /></div>
    }

    const buildingProgressList = props.buildingProgressData.filter(data => {
        const countDownData = timeLeft.find(t => t.building === data.building) || {};
        return countDownData.active;
    }).map(data => {
        const countDownData = timeLeft.find(t => t.building === data.building) || {};
        return (<BuildingProgress key={data.building} progressData={data} duration={countDownData.duration} active={data.status === "InProgress"} />);
    });

    if(Array.isArray(buildingProgressList) && buildingProgressList.length === 0) {
        return (
            <div className="BuildingProgressPanel">
                <p className="no-buildings">No buildings in progress</p>
            </div>
        )
    }
    return (
        <div className="BuildingProgressPanel">
            {buildingProgressList}
        </div>
    );
};

BuildingProgressPanel.propTypes = {
    buildingProgressData: PropTypes.arrayOf(PropTypes.shape({
        building: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        currentLevel: PropTypes.number,
        nextLevel: PropTypes.number.isRequired,
        progress: PropTypes.number.isRequired,
        taskDuration: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        endDate: PropTypes.number.isRequired
    })),
};

export default BuildingProgressPanel;