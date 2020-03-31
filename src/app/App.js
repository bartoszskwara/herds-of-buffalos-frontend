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

const getCurrentUserData = setCurrentUserData => {
    apiCall(Api.user.getCurrentUser)
        .then(response => setCurrentUserData({
            userData: response.data
        }))
        .catch(error => setCurrentUserData({
            error: "Error when fetching current user data."
        }));
};

const App = (props) => {
    const [currentUserData, setCurrentUserData] = useState({});
    useEffect(() => {
        getCurrentUserData(setCurrentUserData);
    }, []);

    return (
        <BrowserRouter>
            <div className="App container">
                <div className="column left">
                    <LeftUpperCorner />
                    <LeftPanel menuItems={menuItemsLeftPanel}/>
                </div>
                <div className="column right">
                    <TopPanel menuItems={menuItemsTopPanel}/>
                    <Switch>
                        <Route exact path="/" render={(props) => <Dashboard {...props} currentUserData={currentUserData} />} />
                        <Route path="/home" component={Test} />
                        <Route path="/map" component={Test} />
                        <Route path="/herd" component={Test} />
                        <Route path="/ranking" component={Test} />
                        <Route path="/buildings" component={Test} />
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
