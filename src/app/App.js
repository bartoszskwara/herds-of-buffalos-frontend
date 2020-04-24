import React, {useEffect, useState} from 'react';
import './App.scss';
import TopPanel from "../components/toppanel/TopPanel";
import LeftPanel from "../components/leftpanel/LeftPanel";
import Dashboard from "../components/dashboard/Dashboard";
import LeftUpperCorner from "../components/leftuppercorner/LeftUpperCorner";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Test from "../components/test/Test";
import NotFound from "../components/notfound/NotFound";
import {menuItemsLeftPanel, menuItemsTopPanel} from "../static/MenuIcons";
import {Api, apiCall} from "../api/Api";
import PlayerHeadline from "../components/dashboard/PlayerHeadline";
import CityHeadline from "../components/dashboard/CityHeadline";
import BuildingWrapper from "../components/Building/BuildingWrapper";
import LoadingError from "../components/error/LoadingError";
import Loader from "../components/loader/Loader";
import {UserContext, CityContext} from "./context/Context";
import BuildingQuickAccess from "../components/dashboard/common/BuildingQuickAccess";

const App = (props) => {
    const [currentUserData, setCurrentUserData] = useState({});
    const [cityData, setCityData] = useState({
        resources: {},
        buildings: []
    });
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
            getCityByCityIdAndUserId(currentUserData.userData.id, currentUserData.userData.currentCityId);
        }
    }, [currentUserData]);

    const getCityByCityIdAndUserId = (userId, cityId) => {
        apiCall(Api.city.getCityByCityIdAndUserId, { pathVariables: { userId, cityId } })
            .then(response => {
                setCityData({
                    ...response.data
                })
            })
            .catch(error => setCityData({
                error: "Error when fetching current city data."
            }));
    };

    if(currentUserData.error) {
        return<LoadingError error={currentUserData.error} />
    }

    return (
        <Loader loading={loading}>
            <BrowserRouter>
                <UserContext.Provider value={currentUserData.userData}>
                    <div className="App container">
                        <div className="column left">
                            <LeftUpperCorner />
                            <LeftPanel menuItems={menuItemsLeftPanel}/>
                        </div>
                        <div className="column right">
                            <TopPanel menuItems={menuItemsTopPanel}/>
                            <CityContext.Provider value={cityData}>
                                <div className="header">
                                    <div className="header-item">
                                        <PlayerHeadline />
                                        <CityHeadline />
                                    </div>
                                    <div className="header-item">
                                        <BuildingQuickAccess />
                                    </div>
                                </div>
                                <Switch>
                                    <Route exact path="/" render={(props) => <Dashboard {...props} />} />
                                    <Route path="/home" component={Test} />
                                    <Route path="/map" component={Test} />
                                    <Route path="/herd" component={Test} />
                                    <Route path="/ranking" component={Test} />
                                    <Route path="/building/:building" render={(props) => <BuildingWrapper {...props} />} />
                                    <Route path="/calendar" component={Test} />
                                    <Route path="/settings" component={Test} />
                                    <Route path="/tasks" component={Test} />
                                    <Route path="/messages" component={Test} />
                                    <Route path="/profile" component={Test} />
                                    <Route component={NotFound} />
                                </Switch>
                            </CityContext.Provider>
                        </div>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </Loader>
    );
};

export default App;
