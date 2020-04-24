import React, {useContext, useEffect, useState} from 'react';
import './CityHeadline.scss';
import Loader from "../loader/Loader";
import LoadingError from "../error/LoadingError";
import {resourceIcons} from "../../static/Resources";
import {CityContext} from "../../app/context/Context";

const CityHeadline = () => {
    const [loading, isLoading] = useState(true);
    const [cityDataError, setCityDataError] = useState("");
    const cityData = useContext(CityContext);

    useEffect(() => {
        if(cityData) {
            isLoading(false);
        }
    }, [cityData]);

    if(cityDataError) {
        return <div className="CityHeadline"><LoadingError error={cityDataError} /></div>;
    }

    if(!cityData.id && !loading) {
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

export default CityHeadline;