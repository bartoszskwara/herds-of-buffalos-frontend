import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CityUnitsPanel.scss';
import LoadingError from "../../error/LoadingError";
import Loader from "../../loader/Loader";
import NumberOfUnitsTile from "./NumberOfUnitsTile";
import {Api, apiCall} from "../../../api/Api";

const getAllCityUnits = (userId, cityId, setCityUnitsData) => {
    apiCall(Api.cityUnit.getAllCityUnits, { pathVariables: { userId, cityId } })
        .then(response => {
            setCityUnitsData({
                cityUnitsData: response.data.content
            })
        })
        .catch(error => setCityUnitsData({
            error: "Error when fetching city units data."
        }));
};

const CityUnitsPanel = props => {
    const [loading, isLoading] = useState(true);
    const [cityUnitsData, setCityUnitsData] = useState({});
    useEffect(() => {
        if(props.currentUserData.userData) {
            getAllCityUnits(props.currentUserData.userData.id, props.currentUserData.userData.currentCityId, setCityUnitsData);
        } else if(props.currentUserData.error) {
            setCityUnitsData({error: "Error when fetching city units data."})
        }
    }, [props.currentUserData]);

    useEffect(() => {
        if(cityUnitsData.cityUnitsData) {
            isLoading(false);
        }
    }, [cityUnitsData.cityUnitsData]);

    if(cityUnitsData.error) {
        return <div className="CityUnitsPanel"><LoadingError error={cityUnitsData.error} /></div>
    } else if(loading) {
        return <div className="CityUnitsPanel"><Loader /></div>
    }

    const unitTiles = cityUnitsData.cityUnitsData.map(data => <NumberOfUnitsTile key={data.unit.key} unit={data.unit} levelsData={data.levelsData}/>);

    return (
        <div className="CityUnitsPanel">
            {unitTiles}
        </div>
    );
};

CityUnitsPanel.propTypes = {
    currentUserData: PropTypes.shape({
        id: PropTypes.number,
        currentCityId: PropTypes.number
    })
};

export default CityUnitsPanel;