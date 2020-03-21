import React from 'react';
import './Loader.scss';
import PropTypes from 'prop-types';

class Loader extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Loader">
                <div className="loader"></div>
            </div>
        );
    }
}

export default Loader;