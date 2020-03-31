import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './RecruitmentProgressPanel.scss';
import LoadingError from "../../lodingerror/LoadingError";
import Loader from "../../loader/Loader";
import RecruitmentProgress from "./RecruitmentProgress";
import moment from "moment";

const RecruitmentProgressPanel = props => {
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
        if(props.recruitmentProgressData) {
            isLoading(false);
            props.recruitmentProgressData.forEach(data => {
                const duration = moment.duration(moment(data.endDate).diff(moment()));
                setTimeLeft(timeLeft => {
                    timeLeft.push({
                        unit: data.unit,
                        duration: duration,
                        active: duration.asMilliseconds() > 0
                    });
                    return timeLeft;
                });
            });
        }
    }, [props.recruitmentProgressData]);

    if(props.error) {
        return <div className="RecruitmentProgressPanel"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="RecruitmentProgressPanel"><Loader /></div>
    }

    const recruitmentProgressList = props.recruitmentProgressData.filter(data => {
        const countDownData = timeLeft.find(t => t.unit === data.unit) || {};
        return countDownData.active;
    }).map(data => {
        const countDownData = timeLeft.find(t => t.unit === data.unit) || {};
        return (<RecruitmentProgress key={data.unit} progressData={data} duration={countDownData.duration}/>);
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
        unit: PropTypes.string.isRequired,
        unitLevel: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        recruitmentTime: PropTypes.number.isRequired,
        endDate: PropTypes.number.isRequired
    })),
};

export default RecruitmentProgressPanel;