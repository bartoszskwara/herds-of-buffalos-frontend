import React, {useContext, useEffect, useState} from 'react';
import './CityUnitsPanel.scss';
import LoadingError from "../../error/LoadingError";
import Loader from "../../loader/Loader";
import NumberOfUnitsTile from "./NumberOfUnitsTile";
import {Api, apiCall} from "../../../api/Api";
import {UserContext} from "../../../app/context/Context";


const CityUnitsPanel = () => {
    const [loading, isLoading] = useState(true);
    const [cityUnitsData, setCityUnitsData] = useState([]);
    const [cityUnitsDataError, setCityUnitsDataError] = useState("");
    const currentUserData = useContext(UserContext);

    const getAllCityUnits = (userId, cityId) => {
        apiCall(Api.cityUnit.getAllCityUnits, { pathVariables: { userId, cityId } })
            .then(response => {
                setCityUnitsData(response.data.content)
            })
            .catch(error => setCityUnitsDataError({
                error: "Error when fetching city units data."
            }));
    };

    useEffect(() => {
        if(currentUserData.id) {
            getAllCityUnits(currentUserData.id, currentUserData.currentCityId);
        }
    }, [currentUserData]);

    useEffect(() => {
        if(cityUnitsData) {
            isLoading(false);
        }
    }, [cityUnitsData]);

    if(cityUnitsDataError) {
        return <div className="CityUnitsPanel"><LoadingError error={cityUnitsDataError} /></div>
    }

    const unitTiles = cityUnitsData.map(data => <NumberOfUnitsTile key={data.unit.key} unit={data.unit} levelsData={data.levelsData}/>);

    return (
        <Loader loading={loading}>
            <div className="CityUnitsPanel">
                {unitTiles}
            </div>
        </Loader>
    );
};

export default CityUnitsPanel;