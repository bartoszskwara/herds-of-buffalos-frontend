import React from 'react';
import './TopSearch.scss';

const TopSearch = () => {

    return (
        <div className="TopSearch">
            <i className="fas fa-search"></i>
            <div className="search-box">
                <input type="text" placeholder="Search for tasks, messages and buildings" />
                <div className="bottom-border"></div>
            </div>
        </div>
    );
};

export default TopSearch;