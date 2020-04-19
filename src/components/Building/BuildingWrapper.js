import React from 'react';
import PropTypes from 'prop-types';
import './BuildingWrapper.scss';
import { useParams } from "react-router-dom";
import NotFound from "../notfound/NotFound";
import Building from "./Building";

const BuildingWrapper = props => {
    const { building } = useParams();

    const buildingComponentMap = {
        barracks: <Building building="barracks" buildingLabel="BARRACKS" userId={props.currentUserData.id} cityId={props.currentUserData.currentCityId}/>,
        townHall: <Building construction building="townHall" buildingLabel="TOWNHALL" userId={props.currentUserData.id} cityId={props.currentUserData.currentCityId}/>,
        pasture: <Building building="pasture" buildingLabel="PASTURE" userId={props.currentUserData.id} cityId={props.currentUserData.currentCityId}/>,
        machineFactory: <Building building="machineFactory" buildingLabel="MACHINE FACTORY" userId={props.currentUserData.id} cityId={props.currentUserData.currentCityId}/>,
        shipyard: <Building building="shipyard" buildingLabel="SHIPYARD" userId={props.currentUserData.id} cityId={props.currentUserData.currentCityId}/>,
        palace: <Building building="palace" buildingLabel="PALACE" userId={props.currentUserData.id} cityId={props.currentUserData.currentCityId}/>,
    };

    const buildingComponent = buildingComponentMap[building] || <NotFound />;
    return (
        <div className="BuildingWrapper">
            {buildingComponent}
        </div>
    );
};

BuildingWrapper.propTypes = {
    currentUserData: PropTypes.object.isRequired
};

export default BuildingWrapper;