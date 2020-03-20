import React from 'react';
import './App.scss';
import TopPanel from "../components/toppanel/TopPanel";
import LeftPanel from "../components/leftpanel/LeftPanel";
import Dashboard from "../components/dashboard/Dashboard";
import LeftUpperCorner from "../components/leftuppercorner/LeftUpperCorner";
import {  } from '@fortawesome/free-solid-svg-icons';
import {Route, Link, BrowserRouter, Switch} from "react-router-dom";
import Test from "../components/Test/Test";
import NotFound from "../components/NotFound/NotFound";

class App extends React.Component {
    render() {

        const menuItemsLeftPanel = [
            {
                name: "home",
                icon: <i className="fas fa-home"></i>,
                link: "/"
            },
            {
                name: "map",
                icon: <i className="fas fa-globe-americas"></i>,
                link: "/map"
            },
            {
                name: "herd",
                icon: <i className="fas fa-users"></i>,
                link: "/herd"
            },
            {
                name: "ranking",
                icon: <i className="fas fa-trophy"></i>,
                link: "/ranking"
            },
            {
                name: "buildings",
                icon: <i className="fas fa-city"></i>,
                link: "/buildings"
            },
            {
                name: "calendar",
                icon: <i className="fas fa-calendar-check"></i>,
                link: "/calendar"
            },
            {
                name: "settings",
                icon: <i className="fas fa-tools"></i>,
                link: "/settings"
            }
        ];

        const menuItemsTopPanel = [
            {
                name: "tasks",
                icon: <i className="fas fa-tasks"></i>,
                link: "/tasks"
            },
            {
                name: "messages",
                icon: <i className="fas fa-envelope"></i>,
                link: "/messages"
            },
            {
                name: "profile",
                icon: <i className="fas fa-user"></i>,
                link: "/profile"
            }
        ];

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
                            <Route exact path="/" component={Dashboard} />
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
    }
}

export default App;
