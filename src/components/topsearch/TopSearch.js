import React from 'react';
import './TopSearch.scss';
import PropTypes from 'prop-types';

class TopSearch extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="TopSearch">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search for tasks, messages and buildings" />
            </div>
        );
    }
}

export default TopSearch;