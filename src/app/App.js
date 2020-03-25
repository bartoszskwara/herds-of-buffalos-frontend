import React from 'react';
import './App.scss';
import TopPanel from "../components/toppanel/TopPanel";
import LeftPanel from "../components/leftpanel/LeftPanel";
import Dashboard from "../components/dashboard/Dashboard";
import LeftUpperCorner from "../components/leftuppercorner/LeftUpperCorner";
import {Route, Link, BrowserRouter, Switch} from "react-router-dom";
import Test from "../components/test/Test";
import NotFound from "../components/notfound/NotFound";
import {menuItemsLeftPanel, menuItemsTopPanel} from "../static/MenuIcons";

class App extends React.Component {
    render() {

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
