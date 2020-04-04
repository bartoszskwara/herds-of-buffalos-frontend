import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './BarracksTasksProgress.scss';
import LoadingError from "../../lodingerror/LoadingError";
import Loader from "../../loader/Loader";
import UnitRecruitment from "./UnitRecruitment";

const BarracksRecruitmentPanel = props => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if(props.unitsInBuilding.units) {
            isLoading(false);
        }
    }, [props.unitsInBuilding]);

    if(props.unitsInBuilding.error) {
        return <div className="BarracksRecruitmentPanel"><LoadingError error={props.unitsInBuilding.error} /></div>
    } else if(loading) {
        return <div className="BarracksRecruitmentPanel"><Loader /></div>
    }

    const unitRecruitmentList = props.unitsInBuilding.units.reduce((resultList, unitData) => {
        unitData.levelsData.forEach(levelData => resultList.push(<UnitRecruitment key={`${unitData.unit.key}-${levelData.level}`} unit={unitData.unit} level={levelData} maxLevel={unitData.maxLevel}/>));
        return resultList;
    }, []);

    return (
        <div className="BarracksRecruitmentPanel">
            {unitRecruitmentList}
        </div>
    );
};

BarracksRecruitmentPanel.propTypes = {
    unitsInBuilding: PropTypes.object
};

export default BarracksRecruitmentPanel;