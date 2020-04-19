import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import '../TaskProgress/TasksProgress.scss';
import LoadingError from "../error/LoadingError";
import Loader from "../loader/Loader";
import UnitRecruitment from "./UnitRecruitment";

const BuildingRecruitmentPanel = props => {
    const [loading, isLoading] = useState(true);
    const [unitRecruitmentList, setUnitRecruitmentList] = useState([]);
    const { unitsInBuilding } = props;

    useEffect(() => {
        if(unitsInBuilding.units) {
            isLoading(false);
            const recruitmentList = unitsInBuilding.units.reduce((resultList, unitData) => {
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
            setUnitRecruitmentList(recruitmentList);
        }
    }, [unitsInBuilding]);

    if(unitsInBuilding.error) {
        return <div className="BuildingRecruitmentPanel"><LoadingError error={unitsInBuilding.error} /></div>
    }
    
    if(!unitsInBuilding) {
        return null;
    }
    if(unitsInBuilding.units && !unitsInBuilding.units.length) {
        return <div className="BuildingRecruitmentPanel"><LoadingError error="No units" /></div>;
    }

    return (
        <div className="BuildingRecruitmentPanel">
            <Loader loading={loading}>{unitRecruitmentList}</Loader>
        </div>
    );
};

BuildingRecruitmentPanel.propTypes = {
    unitsInBuilding: PropTypes.object,
    recruitUnits: PropTypes.func,
};

export default BuildingRecruitmentPanel;