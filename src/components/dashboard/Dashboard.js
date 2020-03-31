import React, {useEffect, useState} from 'react';
import './Dashboard.scss';
import PlayerHeadline from "./PlayerHeadline";
import {Api, apiCall} from '../../api/Api'
import CityHeadline from "./CityHeadline";
import DashboardPanel from "./common/DashboardPanel";
import BuildingProgressPanel from "./buildingprogresspanel/BuildingProgressPanel";
import RecruitmentProgressPanel from "./recruitmentprogresspanel/RecruitmentProgressPanel";
import PropTypes from 'prop-types';
import CityUnitsPanel from "./cityunitspanel/CityUnitsPanel";
import RightDashboardPanel from "./common/RightDashboardPanel";

const getCityByCityIdAndUserId = (userId, cityId, setCityHeadlineData) => {
    apiCall(Api.city.getCityByCityIdAndUserId, { pathVariables: { userId, cityId } })
        .then(response => {
            setCityHeadlineData({
                cityData: response.data
            })
        })
        .catch(error => setCityHeadlineData({
            error: "Error when fetching current city data."
        }));
};

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
    const [cityHeadlineData, setCityHeadlineData] = useState({});
    const [buildingProgressData, setBuildingProgressData] = useState({});
    const [recruitmentProgressData, setRecruitmentProgressData] = useState({});
    const [progressData, setProgressData] = useState({
        buildingProgress: {},
        recruitmentProgress: {}
    });

    useEffect(() => {
        if(props.currentUserData.userData) {
            getCityByCityIdAndUserId(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setCityHeadlineData);
            getCityBuildingProgress(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setBuildingProgressData);
            getCityRecruitmentProgress(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setRecruitmentProgressData);
        } else if(props.currentUserData.error) {
            setCityHeadlineData({error: "Error when fetching current city data."});
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

    const buildingProgressPanel = <BuildingProgressPanel buildingProgressData={progressData.buildingProgress.displayed} error={buildingProgressData.error} />;
    const recruitmentProgressPanel = <RecruitmentProgressPanel recruitmentProgressData={progressData.recruitmentProgress.displayed} error={recruitmentProgressData.error} />;
    const cityUnitsPanel = <CityUnitsPanel currentUserData={props.currentUserData} />;
    return (
        <div className="Dashboard">
            <div className="header">
                <PlayerHeadline userData={props.currentUserData.userData} error={props.currentUserData.error} />
                <CityHeadline cityData={cityHeadlineData.cityData} error={cityHeadlineData.error} />
            </div>
            <div className="content">
                <div className="main-content">
                    <DashboardPanel panel={buildingProgressPanel} name="BUILDING PROGRESS" buttonLabel={buttonLabel(progressData.buildingProgress.removed)}/>
                    <DashboardPanel panel={recruitmentProgressPanel} name="RECRUITMENT PROGRESS" buttonLabel={buttonLabel(progressData.recruitmentProgress.removed)}/>
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