import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CityHeadline.scss';
import Loader from "../loader/Loader";
import LoadingError from "../error/LoadingError";
import {resourceIcons} from "../../static/Resources";


const CityHeadline = props => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if(props.cityData) {
            isLoading(false);
        }
    }, [props.cityData]);

    if(props.error) {
        return <div className="CityHeadline"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="CityHeadline"><Loader /></div>
    }

    const woodIcon = React.cloneElement(resourceIcons.wood.icon, {width: "30px", height: "30px"});
    const clayIcon = React.cloneElement(resourceIcons.clay.icon, {width: "30px", height: "30px"});
    const ironIcon = React.cloneElement(resourceIcons.iron.icon, {width: "30px", height: "30px"});

    return (
        <div className="CityHeadline">
            <div className="city-header">
                <p>{props.cityData.name} <span className="points">{`(${props.cityData.points}p.)`}</span></p>
            </div>
            <div className="resource-box">
                <ul >
                    <li className="resource">
                        <div className="resource-icon">{woodIcon}</div>
                        <div className="item resource-value">{props.cityData.resources.wood}</div>
                    </li>
                    <li className="resource">
                        <div className="resource-icon">{clayIcon}</div>
                        <div className="item resource-value">{props.cityData.resources.clay}</div>
                    </li>
                    <li className="resource">
                        <div className="resource-icon">{ironIcon}</div>
                        <div className="item resource-value">{props.cityData.resources.iron}</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

CityHeadline.propTypes = {
    cityData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        resources: PropTypes.shape({
            wood: PropTypes.number.isRequired,
            clay: PropTypes.number.isRequired,
            iron: PropTypes.number.isRequired,
        })
    }),
    error: PropTypes.string
};

export default CityHeadline;