import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Dashboard.scss';
import {Api, apiCall} from '../../api/Api'
import DashboardPanel from "./common/DashboardPanel";
import CityUnitsPanel from "./cityunitspanel/CityUnitsPanel";
import RightDashboardPanel from "./common/RightDashboardPanel";
import TasksProgress from "../TaskProgress/TasksProgress";
import {UserContext} from "../../app/context/Context";

const buttonLabel = (array) => {
    if(!array || array.length === 0) {
        return "MANAGE";
    }
    return `MANAGE (+${array.length} MORE)`;
};

const Dashboard = () => {
    const [buildingProgressData, setBuildingProgressData] = useState({});
    const [recruitmentProgressData, setRecruitmentProgressData] = useState({});
    const [progressData, setProgressData] = useState({
        buildingProgress: {},
        recruitmentProgress: {}
    });
    const currentUserData = useContext(UserContext);
    const history = useHistory();
    const goToTownHall = () => {
        history.push("/building/townHall");
    }

    useEffect(() => {
        if(currentUserData) {
            getCityBuildingProgress(currentUserData.id, currentUserData.currentCityId, setBuildingProgressData);
            getCityRecruitmentProgress(currentUserData.id, currentUserData.currentCityId, setRecruitmentProgressData);
        }
    }, [currentUserData]);

    useEffect(() => {
        if(buildingProgressData.buildingProgressData) {
            setProgressData(progressData => ({
                ...progressData,
                buildingProgress: {
                    displayed: [...buildingProgressData.buildingProgressData].slice(0, 5),
                    removed: [...buildingProgressData.buildingProgressData].splice(5)
                }}));
        }
    }, [buildingProgressData]);
    useEffect(() => {
        if(recruitmentProgressData.recruitmentProgressData) {
            setProgressData(progressData => ({
                ...progressData,
                recruitmentProgress: {
                    displayed: [...recruitmentProgressData.recruitmentProgressData].slice(0, 5),
                    removed: [...recruitmentProgressData.recruitmentProgressData].splice(5)
                }}));
        }
    }, [recruitmentProgressData]);

    const existTaskOfTypeButNotInProgress = (tasks, type) => {
        return tasks.find(t => t.type === type) && !tasks.find(t => t.type === type && t.status === "InProgress");
    }

    useEffect(() => {
        let timeout;
        if(buildingProgressData.buildingProgressData && buildingProgressData.buildingProgressData.length > 0) {
            if(existTaskOfTypeButNotInProgress(buildingProgressData.buildingProgressData, "recruitment")
                || existTaskOfTypeButNotInProgress(buildingProgressData.buildingProgressData, "construction")) {
                timeout = setTimeout(() => {
                    fetchTasksProgressBuilding();
                }, 1000);
            }
        }
        return () => clearTimeout(timeout);
    }, [buildingProgressData.buildingProgressData]);

    useEffect(() => {
        let timeout;
        if(recruitmentProgressData.recruitmentProgressData && recruitmentProgressData.recruitmentProgressData.length > 0) {
            if(existTaskOfTypeButNotInProgress(recruitmentProgressData.recruitmentProgressData, "recruitment")
                || existTaskOfTypeButNotInProgress(recruitmentProgressData.recruitmentProgressData, "construction")) {
                timeout = setTimeout(() => {
                    fetchTasksProgressRecruitment();
                }, 1000);
            }
        }
        return () => clearTimeout(timeout);
    }, [recruitmentProgressData.recruitmentProgressData]);

    const getCityBuildingProgress = (userId, cityId) => {
        apiCall(Api.cityBuilding.getCityBuildingProgress, { pathVariables: { userId, cityId } })
            .then(response => {
                setBuildingProgressData({
                    buildingProgressData: response.data.content
                })
            })
            .catch(error => setBuildingProgressData({
                error: "Error when fetching building progress data."
            }));
    };

    const getCityRecruitmentProgress = (userId, cityId) => {
        apiCall(Api.cityUnit.getCityRecruitmentProgress, { pathVariables: { userId, cityId } })
            .then(response => {
                setRecruitmentProgressData({
                    recruitmentProgressData: response.data.content
                })
            })
            .catch(error => setRecruitmentProgressData({
                error: "Error when fetching recruitment progress data."
            }));
    };

    const fetchTasksProgressBuilding = () => {
        getCityBuildingProgress(currentUserData.id, currentUserData.currentCityId);
    };

    const fetchTasksProgressRecruitment = () => {
        getCityRecruitmentProgress(currentUserData.id, currentUserData.currentCityId);
    };

    const buildingProgressPanel = <TasksProgress tasksData={ { tasks: progressData.buildingProgress.displayed, error: buildingProgressData.error} } fetchTasksProgress={fetchTasksProgressBuilding}/>;
    const recruitmentProgressPanel = <TasksProgress tasksData={ { tasks: progressData.recruitmentProgress.displayed, error: recruitmentProgressData.error } } fetchTasksProgress={fetchTasksProgressRecruitment}/>;
    const cityUnitsPanel = <CityUnitsPanel />;
    return (
        <div className="Dashboard">
            <div className="content">
                <div className="main-content">
                    <DashboardPanel fixedHeight panel={buildingProgressPanel} name="BUILDING PROGRESS" buttonLabel={buttonLabel(progressData.buildingProgress.removed)} onClick={goToTownHall}/>
                    <DashboardPanel fixedHeight panel={recruitmentProgressPanel} name="RECRUITMENT PROGRESS" buttonLabel={buttonLabel(progressData.recruitmentProgress.removed)}/>
                </div>
                <div className="right-panel">
                    <RightDashboardPanel panel={cityUnitsPanel} name="UNITS IN CITY" />
                </div>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
};

export default Dashboard;