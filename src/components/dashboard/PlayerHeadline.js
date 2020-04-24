import React, {useContext, useEffect, useState} from 'react';
import './PlayerHeadline.scss';
import Loader from "../loader/Loader";
import LoadingError from "../error/LoadingError";
import {UserContext} from "../../app/context/Context";

const PlayerHeadline = props => {
    const [loading, isLoading] = useState(true);
    const currentUserData = useContext(UserContext);

    useEffect(() => {
        if(currentUserData) {
            isLoading(false);
        }
    }, [currentUserData]);

    if(props.error) {
        return <div className="PlayerHeadline"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="PlayerHeadline"><Loader /></div>
    }

    return (
        <div className="PlayerHeadline">
            <p>{currentUserData.name} <span className="points">{`${currentUserData.points}p.`}</span></p>
            <p className="additional-data">{`ranking: ${currentUserData.ranking}`}</p>
            <p className="additional-data">{`number of cities: ${currentUserData.numberOfCities}`}</p>
        </div>
    );
};

export default PlayerHeadline;