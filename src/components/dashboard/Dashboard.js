import React, {useEffect, useState} from 'react';
import './Dashboard.scss';
import PlayerHeadline from "./PlayerHeadline";
import {Api, apiCall} from '../../api/Api'
import axios from 'axios'
import CityHeadline from "./CityHeadline";

const Dashboard = props => {
    const [playerHeadlineData, setPlayerHeadlineData] = useState({});
    const [cityHeadlineData, setCityHeadlineData] = useState({});

    useEffect(() => {
        apiCall(Api.user.getCurrentUser)
            .then(response => setPlayerHeadlineData({
                userData: response.data
            }))
            .catch(error => setPlayerHeadlineData({
                error: "Error when fetching current user data."
            }));
    }, []);

    useEffect(() => {
        if(playerHeadlineData.userData) {
            apiCall(Api.city.getCityByCityIdAndUserId,
                {
                    pathVariables: {
                        userId: playerHeadlineData.userData.id,
                        cityId: playerHeadlineData.userData.currentCityId
                    }
                }
            ).then(response => {
                setCityHeadlineData({
                    cityData: response.data
                })
            })
            .catch(error => setCityHeadlineData({
                error: "Error when fetching current city data."
            }));
        } else if(playerHeadlineData.error) {
            console.log('ssss');
            setCityHeadlineData({
                error: "Error when fetching current city data."
            })
        }
    }, [playerHeadlineData]);

    return (
        <div className="Dashboard">
            <div className="header">
                <PlayerHeadline userData={playerHeadlineData.userData} error={playerHeadlineData.error} />
                <CityHeadline cityData={cityHeadlineData.cityData} error={cityHeadlineData.error} />
            </div>
        </div>
    );
};

Dashboard.propTypes = {

};

export default Dashboard;