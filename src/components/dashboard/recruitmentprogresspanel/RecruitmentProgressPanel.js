import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './RecruitmentProgressPanel.scss';
import LoadingError from "../../error/LoadingError";
import Loader from "../../loader/Loader";
import RecruitmentProgress from "./RecruitmentProgress";
import moment from "moment";

const RecruitmentProgressPanel = props => {
    const [loading, isLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newDuration = timeLeft.active ? timeLeft.duration.subtract(1, 's') : timeLeft.duration;
            setTimeLeft( {
                    ...timeLeft,
                    duration: newDuration.asMilliseconds() < 0 ? moment.duration(0) : newDuration,
                    active: newDuration.asMilliseconds() > 0
                });
            }, 1000);
        return () => clearTimeout(interval);
    }, []);

    useEffect(() => {
        if(props.recruitmentProgressData) {
            isLoading(false);
            const inProgressTask = props.recruitmentProgressData.find(data => data.status === "InProgress");
            const duration = moment.duration(moment(inProgressTask.endDate).diff(moment()));
            setTimeLeft({
                id: inProgressTask.id,
                duration: duration,
                active: duration.asMilliseconds() > 0
            });
        }
    }, [props.recruitmentProgressData]);

    if(props.error) {
        return <div className="RecruitmentProgressPanel"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="RecruitmentProgressPanel"><Loader /></div>
    }

    const recruitmentProgressList = props.recruitmentProgressData.filter(data => {
        const countDownData = data.id === timeLeft.id ? timeLeft : {};
        return countDownData.active;
    }).map(data => {
        const countDownData = data.id === timeLeft.id ? timeLeft : {};
        return (<RecruitmentProgress key={data.unit} progressData={data} duration={countDownData.duration} active={data.status === "InProgress"} />);
    });

    if(Array.isArray(recruitmentProgressList) && recruitmentProgressList.length === 0) {
        return (
            <div className="RecruitmentProgressPanel">
                <p className="no-recruitments">No recruitments in progress</p>
            </div>
        )
    }
    return (
        <div className="RecruitmentProgressPanel">
            {recruitmentProgressList}
        </div>
    );
};

RecruitmentProgressPanel.propTypes = {
    recruitmentProgressData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        unitLevel: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        taskDuration: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        endDate: PropTypes.number.isRequired
    })),
};

export default RecruitmentProgressPanel;