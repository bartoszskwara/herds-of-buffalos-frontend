import React from 'react';
import './Loader.scss';
import PropTypes from 'prop-types';

const Loader = props => {
    const { loading, children } = props;
    if(loading) {
        return (
            <div className="Loader">
                <div className="loader"></div>
            </div>
        );
    }
    return (
        <React.Fragment>{children}</React.Fragment>
    );
};
Loader.propTypes = {
   loading: PropTypes.bool
};

export default Loader;