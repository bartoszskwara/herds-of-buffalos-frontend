import React from 'react';
import './BuildingWrapper.scss';
import { useParams } from "react-router-dom";
import NotFound from "../notfound/NotFound";
import Building from "./Building";

const BuildingWrapper = () => {
    const { building } = useParams();

    const buildingComponentMap = {
        barracks: <Building building="barracks" buildingLabel="BARRACKS" />,
        townHall: <Building construction building="townHall" buildingLabel="TOWNHALL" />,
        pasture: <Building building="pasture" buildingLabel="PASTURE" />,
        machineFactory: <Building building="machineFactory" buildingLabel="MACHINE FACTORY" />,
        shipyard: <Building building="shipyard" buildingLabel="SHIPYARD" />,
        palace: <Building building="palace" buildingLabel="PALACE" />,
    };

    const buildingComponent = buildingComponentMap[building] || <NotFound />;
    return (
        <div className="BuildingWrapper">
            {buildingComponent}
        </div>
    );
};

export default BuildingWrapper;