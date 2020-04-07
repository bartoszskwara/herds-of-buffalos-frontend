import React, {useEffect, useState} from 'react';
import './App.scss';
import TopPanel from "../components/toppanel/TopPanel";
import LeftPanel from "../components/leftpanel/LeftPanel";
import Dashboard from "../components/dashboard/Dashboard";
import LeftUpperCorner from "../components/leftuppercorner/LeftUpperCorner";
import {Route, Link, BrowserRouter, Switch} from "react-router-dom";
import Test from "../components/test/Test";
import NotFound from "../components/notfound/NotFound";
import {menuItemsLeftPanel, menuItemsTopPanel} from "../static/MenuIcons";
import DashboardPanel from "../components/dashboard/common/DashboardPanel";
import {Api, apiCall} from "../api/Api";
import CityUnitsPanel from "../components/dashboard/cityunitspanel/CityUnitsPanel";
import PlayerHeadline from "../components/dashboard/PlayerHeadline";
import CityHeadline from "../components/dashboard/CityHeadline";
import Building from "../components/Building/Building";
import LoadingError from "../components/error/LoadingError";
import Loader from "../components/loader/Loader";


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

const App = (props) => {
    const [currentUserData, setCurrentUserData] = useState({});
    const [cityHeadlineData, setCityHeadlineData] = useState({});
    const [loading, isLoading] = useState(true);

    const getCurrentUserData = setCurrentUserData => {
        apiCall(Api.user.getCurrentUser)
            .then(response => {
                setCurrentUserData({
                    userData: response.data
                });
            })
            .catch(error => setCurrentUserData({
                error: "Error when fetching current user data."
            }));
    };

    useEffect(() => {
        getCurrentUserData(setCurrentUserData);
    }, []);

    useEffect(() => {
        if(currentUserData.userData) {
            isLoading(false);
        }
    }, [currentUserData]);

    useEffect(() => {
        if(currentUserData.userData) {
            getCityByCityIdAndUserId(currentUserData.userData.id, currentUserData.userData.currentCityId, setCityHeadlineData);
        } else if(currentUserData.error) {
            setCityHeadlineData({error: "Error when fetching current city data."});
        }
    }, [currentUserData]);

    if(currentUserData.error) {
        return <div className="CityHeadline"><LoadingError error={currentUserData.error} /></div>
    } else if(loading) {
        return <div className="CityHeadline"><Loader /></div>
    }

    return (
        <BrowserRouter>
            <div className="App container">
                <div className="column left">
                    <LeftUpperCorner />
                    <LeftPanel menuItems={menuItemsLeftPanel}/>
                </div>
                <div className="column right">
                    <TopPanel menuItems={menuItemsTopPanel}/>
                    <div className="header">
                        <PlayerHeadline userData={currentUserData.userData} error={currentUserData.error} />
                        <CityHeadline cityData={cityHeadlineData.cityData} error={cityHeadlineData.error} />
                    </div>
                    <Switch>
                        <Route exact path="/" render={(props) => <Dashboard {...props} currentUserData={currentUserData} />} />
                        <Route path="/home" component={Test} />
                        <Route path="/map" component={Test} />
                        <Route path="/herd" component={Test} />
                        <Route path="/ranking" component={Test} />
                        <Route path="/building/:building" render={(props) => <Building {...props} currentUserData={currentUserData.userData} />} />
                        <Route path="/calendar" component={Test} />
                        <Route path="/settings" component={Test} />
                        <Route path="/tasks" component={Test} />
                        <Route path="/messages" component={Test} />
                        <Route path="/profile" component={Test} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
