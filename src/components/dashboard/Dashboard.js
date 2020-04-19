import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Dashboard.scss';
import {Api, apiCall} from '../../api/Api'
import DashboardPanel from "./common/DashboardPanel";
import PropTypes from 'prop-types';
import CityUnitsPanel from "./cityunitspanel/CityUnitsPanel";
import RightDashboardPanel from "./common/RightDashboardPanel";
import TasksProgress from "../TaskProgress/TasksProgress";

const getCityBuildingProgress = (userId, cityId, setBuildingProgressData) => {
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

const getCityRecruitmentProgress = (userId, cityId, setRecruitmentProgress) => {
    apiCall(Api.cityUnit.getCityRecruitmentProgress, { pathVariables: { userId, cityId } })
        .then(response => {
            setRecruitmentProgress({
                recruitmentProgressData: response.data.content
            })
        })
        .catch(error => setRecruitmentProgress({
            error: "Error when fetching recruitment progress data."
        }));
};

const buttonLabel = (array) => {
    if(!array || array.length === 0) {
        return "MANAGE";
    }
    return `MANAGE (+${array.length} MORE)`;
};

const Dashboard = props => {
    const [buildingProgressData, setBuildingProgressData] = useState({});
    const [recruitmentProgressData, setRecruitmentProgressData] = useState({});
    const [progressData, setProgressData] = useState({
        buildingProgress: {},
        recruitmentProgress: {}
    });
    const history = useHistory();
    const goToTownHall = () => {
        history.push("/building/townHall");
    }

    useEffect(() => {
        if(props.currentUserData.userData) {
            getCityBuildingProgress(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setBuildingProgressData);
            getCityRecruitmentProgress(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setRecruitmentProgressData);
        } else if(props.currentUserData.error) {
            setBuildingProgressData({error: "Error when fetching building progress data."});
            setRecruitmentProgressData({error: "Error when fetching recruitment progress data."});
        }
    }, [props.currentUserData]);

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

    const fetchTasksProgressBuilding = () => {
        getCityBuildingProgress(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setBuildingProgressData);
    };

    const fetchTasksProgressRecruitment = () => {
        getCityRecruitmentProgress(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setRecruitmentProgressData);
    };

    const buildingProgressPanel = <TasksProgress tasksData={ { tasks: progressData.buildingProgress.displayed, error: buildingProgressData.error} } fetchTasksProgress={fetchTasksProgressBuilding}/>;
    const recruitmentProgressPanel = <TasksProgress tasksData={ { tasks: progressData.recruitmentProgress.displayed, error: recruitmentProgressData.error } } fetchTasksProgress={fetchTasksProgressRecruitment}/>;
    const cityUnitsPanel = <CityUnitsPanel currentUserData={props.currentUserData} />;
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
    currentUserData: PropTypes.object.isRequired
};

export default Dashboard;