import React from 'react';
import './TopSearch.scss';
import {searchIcon} from "../../static/MenuIcons";

const TopSearch = () => {
    const icon = React.cloneElement(searchIcon.icon, {
        width: "18px", height: "18px"
    });
    return (
        <div className="TopSearch">
            <div className="icon">{icon}</div>
            <div className="search-box">
                <input type="text" placeholder="Search for tasks, messages and buildings" />
                <div className="bottom-border"></div>
            </div>
        </div>
    );
};

export default TopSearch;