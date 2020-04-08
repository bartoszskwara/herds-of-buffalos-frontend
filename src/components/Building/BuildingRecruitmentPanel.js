import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../TaskProgress/TasksProgress.scss';
import LoadingError from "../error/LoadingError";
import Loader from "../loader/Loader";
import UnitRecruitment from "./UnitRecruitment";

const BuildingRecruitmentPanel = props => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if(props.unitsInBuilding.units) {
            isLoading(false);
        }
    }, [props.unitsInBuilding]);

    if(props.unitsInBuilding.error) {
        return <div className="BuildingRecruitmentPanel"><LoadingError error={props.unitsInBuilding.error} /></div>
    } else if(loading) {
        return <div className="BuildingRecruitmentPanel"><Loader /></div>
    }

    const unitRecruitmentList = props.unitsInBuilding.units.reduce((resultList, unitData) => {
        unitData.levelsData.forEach(levelData => resultList.push(
            <UnitRecruitment
                key={`${unitData.unit.key}-${levelData.level}`}
                unit={unitData.unit}
                level={levelData}
                maxLevel={unitData.maxLevel}
                recruitUnits={props.recruitUnits}
            />));
        return resultList;
    }, []);

    return (
        <div className="BuildingRecruitmentPanel">
            {unitRecruitmentList}
        </div>
    );
};

BuildingRecruitmentPanel.propTypes = {
    unitsInBuilding: PropTypes.object,
    recruitUnits: PropTypes.func,
};

export default BuildingRecruitmentPanel;