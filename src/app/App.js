import React from 'react';
import './App.scss';
import TopPanel from "../components/toppanel/TopPanel";
import LeftPanel from "../components/leftpanel/LeftPanel";
import Dashboard from "../components/dashboard/Dashboard";
import LeftUpperCorner from "../components/leftuppercorner/LeftUpperCorner";
import {  } from '@fortawesome/free-solid-svg-icons';
import {Route, Link, BrowserRouter, Switch} from "react-router-dom";
import Test from "../components/test/Test";
import NotFound from "../components/notfound/NotFound";

class App extends React.Component {
    render() {

        const menuItemsLeftPanel = [
            {
                name: "home",
                icon: <i className="icofont-home"></i>,
                link: "/"
            },
            {
                name: "map",
                icon: <i className="icofont-world"></i>,
                link: "/map"
            },
            {
                name: "herd",
                icon: <i className="icofont-users-alt-5"></i>,
                link: "/herd"
            },
            {
                name: "ranking",
                icon: <i className="icofont-trophy-alt"></i>,
                link: "/ranking"
            },
            {
                name: "buildings",
                icon: <i className="icofont-industries-4"></i>,
                link: "/buildings"
            },
            {
                name: "calendar",
                icon: <i className="icofont-ui-calendar"></i>,
                link: "/calendar"
            },
            {
                name: "settings",
                icon: <i className="icofont-settings"></i>,
                link: "/settings"
            }
        ];

        const menuItemsTopPanel = [
            {
                name: "tasks",
                icon: <i className="icofont-tasks-alt"></i>,
                link: "/tasks"
            },
            {
                name: "messages",
                icon: <i className="icofont-ui-message"></i>,
                link: "/messages"
            },
            {
                name: "profile",
                icon: <i className="icofont-user-alt-4"></i>,
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
