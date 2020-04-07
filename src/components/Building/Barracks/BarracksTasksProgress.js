import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './BarracksTasksProgress.scss';
import LoadingError from "../../error/LoadingError";
import Loader from "../../loader/Loader";
import BuildingProgress from "../../dashboard/buildingprogresspanel/BuildingProgress";
import RecruitmentProgress from "../../dashboard/recruitmentprogresspanel/RecruitmentProgress";
import moment from "moment";

const BarracksTasksProgress = props => {
    const [loading, isLoading] = useState(true);
    const [inProgressTasksTimeLeft, setInProgressTasksTimeLeft] = useState([]);

    useEffect(() => {
        const intervals = [];
        if(props.tasksData.tasks) {
            isLoading(false);
            const inProgressTasks = props.tasksData.tasks.filter(t => t.status === "InProgress");
            const timeLefts = [];
            inProgressTasks.forEach(task => {
                const duration = moment.duration(moment(task.endDate).diff(moment()));
                timeLefts.push({
                    id: task.id,
                    duration: duration,
                });
                setInProgressTasksTimeLeft(timeLefts);

                intervals.push(setInterval(() => {
                    const inProgressTaskTimeLeftArray = [...timeLefts];
                    const timeLeftForTask = inProgressTaskTimeLeftArray.find(t => t.id === task.id);
                    const duration = timeLeftForTask.duration.subtract(1, 's');
                    if(duration.asMilliseconds() > 0) {
                        Object.assign(timeLeftForTask, {
                            duration
                        });
                        setInProgressTasksTimeLeft(inProgressTaskTimeLeftArray);
                    } else {
                        props.fetchTasksProgress();
                    }
                }, 1000));
            });
        }
        return () => { intervals.forEach(i => clearInterval(i)) };
    }, [props.tasksData]);

    if(props.tasksData.error) {
        return <div className="BarracksTasksProgress"><LoadingError error={props.tasksData.error} /></div>
    } else if(loading) {
        return <div className="BarracksTasksProgress"><Loader /></div>
    }

    const tasks = props.tasksData.tasks.map(task => {
        const timeLeftForTask = inProgressTasksTimeLeft.find(t => t.id === task.id);
        const duration = timeLeftForTask && task.status === "InProgress" ? timeLeftForTask.duration : moment.duration(task.taskDuration);
        return task.type === 'building' ?
            <BuildingProgress key={`building-task-${task.id}`} active={task.status === "InProgress"} duration={duration}  progressData={task}/>
            : <RecruitmentProgress key={`recruitment-task-${task.id}`} active={task.status === "InProgress"} duration={duration}  progressData={task}/>
    });

    return (
        <div className="BarracksTasksProgress">
            {tasks}
        </div>
    );
};

BarracksTasksProgress.propTypes = {
    tasksData: PropTypes.shape({
        tasks: PropTypes.arrayOf({
            id: PropTypes.number,
            type: PropTypes.string,
            creationDate: PropTypes.number,
            building: PropTypes.string,
            unit: PropTypes.string,
            unitLevel: PropTypes.number,
            label: PropTypes.string,
            currentLevel: PropTypes.number,
            nextLevel: PropTypes.number,
            amount: PropTypes.number,
            taskDuration: PropTypes.number,
            endDate: PropTypes.number,
            status: PropTypes.string
        })
    }),
    fetchTasksProgress: PropTypes.func.isRequired
};

export default BarracksTasksProgress;