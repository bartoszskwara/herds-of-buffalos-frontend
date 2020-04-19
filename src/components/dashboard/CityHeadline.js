import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CityHeadline.scss';
import Loader from "../loader/Loader";
import LoadingError from "../error/LoadingError";
import {resourceIcons} from "../../static/Resources";
import {Api, apiCall} from "../../api/Api";
import UserContext from "../../app/context/UserContext";


const CityHeadline = props => {
    const [loading, isLoading] = useState(true);
    const [cityData, setCityData] = useState({});
    const [cityDataError, setCityDataError] = useState("");
    const currentUserData = useContext(UserContext);

    const getCityByCityIdAndUserId = (userId, cityId) => {
        apiCall(Api.city.getCityByCityIdAndUserId, { pathVariables: { userId, cityId } })
            .then(response => {
                setCityData({
                    ...response.data
                })
            })
            .catch(error => setCityDataError("Error when fetching current city data."));
    };

    useEffect(() => {
        if(currentUserData.id) {
            getCityByCityIdAndUserId(currentUserData.id, currentUserData.currentCityId);
        } else if(currentUserData.error) {
            setCityDataError("Error when fetching current city data.");
        }
    }, [currentUserData]);

    useEffect(() => {
        if(cityData) {
            isLoading(false);
        }
    }, [cityData]);

    if(cityDataError) {
        return <div className="CityHeadline"><LoadingError error={cityDataError} /></div>;
    }

    if(!cityData) {
        return null;
    }
    if(!cityData.id) {
        return <div className="CityHeadline"><LoadingError error="No city data" /></div>;
    }

    const woodIcon = React.cloneElement(resourceIcons.wood.icon, {width: "30px", height: "30px"});
    const clayIcon = React.cloneElement(resourceIcons.clay.icon, {width: "30px", height: "30px"});
    const ironIcon = React.cloneElement(resourceIcons.iron.icon, {width: "30px", height: "30px"});

    return (
        <Loader loading={loading}>
            <div className="CityHeadline">
                <div className="city-header">
                    <p>{cityData.name} <span className="points">{`(${cityData.points}p.)`}</span></p>
                </div>
                <div className="resource-box">
                    <ul >
                        <li className="resource">
                            <div className="resource-icon">{woodIcon}</div>
                            <div className="item resource-value">{cityData.resources.wood}</div>
                        </li>
                        <li className="resource">
                            <div className="resource-icon">{clayIcon}</div>
                            <div className="item resource-value">{cityData.resources.clay}</div>
                        </li>
                        <li className="resource">
                            <div className="resource-icon">{ironIcon}</div>
                            <div className="item resource-value">{cityData.resources.iron}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </Loader>
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