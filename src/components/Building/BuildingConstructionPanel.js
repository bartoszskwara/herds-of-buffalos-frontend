import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../TaskProgress/TasksProgress.scss';
import LoadingError from "../error/LoadingError";
import Loader from "../loader/Loader";
import BuildingConstruction from "./BuildingConstruction";

const BuildingConstructionPanel = props => {
    const [loading, isLoading] = useState(true);
    const [buildingConstructionList, setBuildingConstructionList] = useState([]);
    const { buildingsInCity, upgradeBuilding } = props;

    useEffect(() => {
        if(buildingsInCity.buildings) {
            isLoading(false);
            const constructionList = buildingsInCity.buildings.reduce((resultList, buildingData) => {
                return [...resultList,
                    <BuildingConstruction
                        key={`${buildingData.building.key}`}
                        building={buildingData.building}
                        currentLevel={buildingData.currentLevel}
                        nextLevel={buildingData.nextLevel}
                        maxLevel={buildingData.maxLevel}
                        upgradeBuilding={upgradeBuilding}
                    />];
            }, []);
            setBuildingConstructionList(constructionList);
        }
    }, [buildingsInCity]);

    if(!buildingsInCity) {
        return null;
    }

    if(buildingsInCity.error) {
        return <div className="BuildingConstructionPanel"><LoadingError error={buildingsInCity.error} /></div>
    }

    if(buildingsInCity.buildings && !buildingsInCity.buildings.length) {
        return <div className="BuildingConstructionPanel"><LoadingError error="No buildings" /></div>;
    }

    return (
        <div className="BuildingConstructionPanel">
            <Loader loading={loading}>{buildingConstructionList}</Loader>
        </div>
    );
};

BuildingConstructionPanel.propTypes = {
    buildingsInCity: PropTypes.object,
    upgradeBuilding: PropTypes.func,
};

export default BuildingConstructionPanel;