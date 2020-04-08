import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Building.scss';
import RightDashboardPanel from "../dashboard/common/RightDashboardPanel";
import {Api, apiCall} from "../../api/Api";
import TasksProgress from "../TaskProgress/TasksProgress";
import DashboardPanel from "../dashboard/common/DashboardPanel";
import BuildingRecruitmentPanel from "./BuildingRecruitmentPanel";
import UnexpectedError from "../error/UnexpectedError";

const Building = props => {
    const { userId, cityId, building, buildingLabel } = props;

    const [tasksData, setTasksData] = useState({});
    const [unitsInBuilding, setUnitsInBuilding] = useState({});
    const [recruitmentError, setRecruitmentError] = useState(false);

    const fetchTasksProgress = () => {
        apiCall(Api.cityBuilding.getTasksProgress, { pathVariables: { building, userId, cityId } })
            .then(response => {
                setTasksData({
                    tasks: response.data.content
                });
            })
            .catch(error => {
                setTasksData({
                    error: "Error when fetching tasks progress data."
                })
            });
    };

    const fetchAvailableUnits = () => {
        apiCall(Api.cityBuilding.getAvailableUnits, { pathVariables: { building, userId, cityId } })
            .then(response => {
                setUnitsInBuilding({
                    units: response.data.content
                });
            })
            .catch(error => {
                setUnitsInBuilding({
                    error: "Error when fetching available units in building."
                })
            });
    };

    const recruitUnits = (data = {}) => {
        apiCall(Api.cityUnit.recruitUnit, { data, pathVariables: { userId, cityId } })
            .then(response => {
                fetchTasksProgress();
                fetchAvailableUnits();
                setRecruitmentError(false);
            })
            .catch(error => {
                setRecruitmentError(true);
            });
    };

    useEffect(() => {
        if(userId) {
            fetchTasksProgress();
            fetchAvailableUnits();
        }
    }, [userId]);

    useEffect(() => {
        const timeout = null;
        if(recruitmentError) {
            setTimeout(() => {
                setRecruitmentError(false);
            }, 3000);
        }
        return clearTimeout(timeout);
    }, [recruitmentError]);

    const buildingTasksProgress = <TasksProgress tasksData={tasksData} fetchTasksProgress={fetchTasksProgress} />;
    const buildingRecruitmentPanel = <BuildingRecruitmentPanel unitsInBuilding={unitsInBuilding} recruitUnits={recruitUnits} />;

    return (
        <div className="Building">
            <div className="content">
                <div className="main-content">
                    <div className="recruitment-error">
                        {recruitmentError && <UnexpectedError message="Recruitment request failed" />}
                    </div>
                    <div className="building-name">{buildingLabel}</div>
                    <div className="building-dashboard">
                        <DashboardPanel panel={buildingRecruitmentPanel} name="RECRUITMENT" />
                    </div>
                </div>
                <div className="right-panel">
                    <RightDashboardPanel panel={buildingTasksProgress} name="TASKS PROGRESS" />
                </div>
            </div>
        </div>
    );
};

Building.propTypes = {
    userId: PropTypes.number,
    cityId: PropTypes.number,
    building: PropTypes.string.isRequired,
    buildingLabel: PropTypes.string.isRequired,
};

export default Building;