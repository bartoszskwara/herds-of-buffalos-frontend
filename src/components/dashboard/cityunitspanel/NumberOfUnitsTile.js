import React from 'react';
import PropTypes from 'prop-types';
import './NumberOfUnitsTile.scss';
import {unitIcons} from '../../../static/UnitIcons'

const UnitSymbol = props => {
    let level = "";
    Array(props.level).fill("").map(() => level = level.concat("I"));
    return(
        <div className="unit-symbol">
            {props.unitIcon}
            <div className="level-badge">{level}</div>
        </div>
    );
};

const UnitLevelData = props => {
    const unitIconData = unitIcons[props.unitKey] || unitIcons.unknown;
    const unitIcon = React.cloneElement(
        unitIconData.icon,
        { width: "20px", height: "20px" }
    );
    return (
        <div
            key={`${props.unitKey}${props.levelData.level}`}
            className="unit-level-data">
            <div className="unit-symbol-level-box">
                <UnitSymbol unitIcon={unitIcon} level={props.levelData.level} />
            </div>
            <div className="unit-amount">
                <p>{props.levelData.amountInCity}</p>
            </div>
        </div>
    );
};

const NumberOfUnitsTile = props => {
    const unitLevelData = props.unitData.levelsData
        .map(levelData =>
            <UnitLevelData
                key={`${props.unitData.unit.key}${levelData.level}`}
                unitKey={props.unitData.unit.key}
                levelData={levelData}/>)
    return (
        <div className="NumberOfUnitsTile">
            {unitLevelData}
        </div>
    );
};

UnitSymbol.propTypes = {
    unitIcon: PropTypes.node.isRequired
};
UnitLevelData.propTypes = {
    unitKey: PropTypes.string.isRequired,
    levelData: PropTypes.shape({
        level: PropTypes.number,
        amountInCity: PropTypes.number
    })
};
NumberOfUnitsTile.propTypes = {
    unitData: PropTypes.shape({
        unit: PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            building: PropTypes.string.isRequired,
        }).isRequired,
        levelsData: PropTypes.arrayOf(PropTypes.shape({
            level: PropTypes.number,
            amountInCity: PropTypes.number
        }))
    })
};

export default NumberOfUnitsTile;