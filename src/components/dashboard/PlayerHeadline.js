import React, {useEffect, useState} from 'react';
import './PlayerHeadline.scss';
import PropTypes from 'prop-types';
import Loader from "../loader/Loader";
import LoadingError from "../error/LoadingError";

const PlayerHeadline = props => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if(props.userData) {
            isLoading(false);
        }
    }, [props.userData]);

    if(props.error) {
        return <div className="PlayerHeadline"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="PlayerHeadline"><Loader /></div>
    }

    return (
        <div className="PlayerHeadline">
            <p>{props.userData.name} <span className="points">{`${props.userData.points}p.`}</span></p>
            <p className="additional-data">{`ranking: ${props.userData.ranking}`}</p>
            <p className="additional-data">{`number of cities: ${props.userData.numberOfCities}`}</p>
        </div>
    );
};

PlayerHeadline.propTypes = {
    userData: PropTypes.object,
    error: PropTypes.string
};

export default PlayerHeadline;