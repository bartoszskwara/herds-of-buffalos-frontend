import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './BarracksTasksProgress.scss';
import LoadingError from "../../lodingerror/LoadingError";
import Loader from "../../loader/Loader";

const BarracksTasksProgress = props => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if(props.tasksData.tasks) {
            isLoading(false);
        }
    }, [props.tasksData]);

    if(props.tasksData.error) {
        return <div className="BarracksTasksProgress"><LoadingError error={props.tasksData.error} /></div>
    } else if(loading) {
        return <div className="BarracksTasksProgress"><Loader /></div>
    }

    return (
        <div className="BarracksTasksProgress">
            BarracksTasksProgress
        </div>
    );
};

BarracksTasksProgress.propTypes = {
    tasksData: PropTypes.object
};

export default BarracksTasksProgress;