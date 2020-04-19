import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './TasksProgress.scss';
import LoadingError from "../error/LoadingError";
import Loader from "../loader/Loader";
import BuildingProgress from "../TaskProgress/BuildingProgress";
import RecruitmentProgress from "../TaskProgress/RecruitmentProgress";
import moment from "moment";

const TasksProgress = props => {
    const [loading, isLoading] = useState(true);
    const [tasksList, setTasksList] = useState([]);
    const {tasksData, fetchTasksProgress} = props;

    useEffect(() => {
        if(tasksData.tasks) {
            isLoading(false);
            setTasksList(tasksData.tasks);
        }
    }, [tasksData]);

    if(!tasksData || !tasksData.tasks) {
        return null;
    }

    if(tasksData.error) {
        return <div className="TasksProgress"><LoadingError error={tasksData.error} /></div>
    }

    if(tasksData.tasks && !tasksData.tasks.length) {
        return <div className="TasksProgress"><LoadingError error="No tasks" /></div>;
    }

    const taskItems = tasksList.map(task => {
        const timeSpent = task.startDate ? moment.duration(moment().valueOf() - task.startDate) : moment.duration(0);
        return task.type === 'construction' ?
            <BuildingProgress key={`building-task-${task.id}`} active={task.status === "InProgress"} timeSpent={timeSpent} progressData={task} fetchTasksProgress={fetchTasksProgress}/>
            : <RecruitmentProgress key={`recruitment-task-${task.id}`} active={task.status === "InProgress"} timeSpent={timeSpent} progressData={task} fetchTasksProgress={fetchTasksProgress}/>
    });

    return (
        <div className="TasksProgress">
            <Loader loading={loading}>
                {(taskItems && taskItems.length === 0) && <div className="task-list-empty">Task queue is empty</div>}
                {taskItems}
            </Loader>
        </div>
    );
};

TasksProgress.propTypes = {
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
            startDate: PropTypes.number,
            taskDuration: PropTypes.number,
            endDate: PropTypes.number,
            status: PropTypes.string
        })
    }),
    fetchTasksProgress: PropTypes.func.isRequired
};

export default TasksProgress;