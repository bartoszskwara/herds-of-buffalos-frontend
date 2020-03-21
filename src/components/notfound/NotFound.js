import React from 'react';
import './NotFound.scss';
import PropTypes from 'prop-types';

class NotFound extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="NotFound">
                <h1>Page Not Found!</h1>
            </div>
        );
    }
}

export default NotFound;