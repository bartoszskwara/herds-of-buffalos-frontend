import React, {useEffect, useState} from 'react';
import './Dashboard.scss';
import PlayerHeadline from "./PlayerHeadline";
import {Api, apiCall} from '../../api/Api'
import CityHeadline from "./CityHeadline";
import CityUnitsPanel from "./cityunitspanel/CityUnitsPanel";
import DashboardPanel from "./DashboardPanel";
import BuildingProgressPanel from "./buildingprogresspanel/BuildingProgressPanel";
import PropTypes from "prop-types";

const getCurrentUserData = setPlayerHeadlineData => {
    apiCall(Api.user.getCurrentUser)
        .then(response => setPlayerHeadlineData({
            userData: response.data
        }))
        .catch(error => setPlayerHeadlineData({
            error: "Error when fetching current user data."
        }));
};

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

const getAllCityUnits = (userId, cityId, setCityUnitsData) => {
    apiCall(Api.cityUnit.getAllCityUnits, { pathVariables: { userId, cityId } })
        .then(response => {
            setCityUnitsData({
                cityUnitsData: response.data.content
            })
        })
        .catch(error => setCityUnitsData({
            error: "Error when fetching city units data."
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

const Dashboard = props => {
    const [playerHeadlineData, setPlayerHeadlineData] = useState({});
    const [cityHeadlineData, setCityHeadlineData] = useState({});
    const [cityUnitsData, setCityUnitsData] = useState({});
    const [buildingProgressData, setBuildingProgressData] = useState({});

    useEffect(() => {
        getCurrentUserData(setPlayerHeadlineData);
    }, []);

    useEffect(() => {
        if(playerHeadlineData.userData) {
            getCityByCityIdAndUserId(playerHeadlineData.userData.id, playerHeadlineData.userData.currentCityId, setCityHeadlineData);
        } else if(playerHeadlineData.error) {
            setCityHeadlineData({
                error: "Error when fetching current city data."
            })
        }
    }, [playerHeadlineData]);

    useEffect(() => {
        if(playerHeadlineData.userData) {
            getAllCityUnits(playerHeadlineData.userData.id, playerHeadlineData.userData.currentCityId, setCityUnitsData);
        } else if(playerHeadlineData.error) {
            setCityUnitsData({
                error: "Error when fetching city units data."
            })
        }
    }, [playerHeadlineData]);

    useEffect(() => {
        if(playerHeadlineData.userData) {
            getCityBuildingProgress(playerHeadlineData.userData.id, playerHeadlineData.userData.currentCityId, setBuildingProgressData);
        } else if(playerHeadlineData.error) {
            setBuildingProgressData({
                error: "Error when fetching building progress."
            })
        }
    }, [playerHeadlineData]);

    const cityUnitsPanel = <CityUnitsPanel cityUnitsData={cityUnitsData.cityUnitsData} error={cityUnitsData.error} />;
    const buildingProgressPanel = <BuildingProgressPanel buildingProgressData={buildingProgressData.buildingProgressData} error={buildingProgressData.error} />;
    return (
        <div className="Dashboard">
            <div className="header">
                <PlayerHeadline userData={playerHeadlineData.userData} error={playerHeadlineData.error} />
                <CityHeadline cityData={cityHeadlineData.cityData} error={cityHeadlineData.error} />
            </div>
            <div className="content">
                <DashboardPanel panel={cityUnitsPanel} name="UNITS IN CITY" />
                <DashboardPanel panel={buildingProgressPanel} name="BUILDING PROGRESS" />
            </div>
        </div>
    );
};

Dashboard.propTypes = {

};

export default Dashboard;