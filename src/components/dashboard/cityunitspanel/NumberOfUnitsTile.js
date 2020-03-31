import React from 'react';
import PropTypes from 'prop-types';
import './NumberOfUnitsTile.scss';
import './NumberOfSingleLevelUnits.scss';
import {unit} from "../../../static/Unit";
import NumberOfSingleLevelUnits from "./NumberOfSingleLevelUnits";

const NumberOfUnitsTile = props => {
    const unitIconData = unit[props.unit.key] || unit.unknown;
    const unitIcon = React.cloneElement(
        unitIconData.icon,
        { width: "30px", height: "30px" }
    );
    const unitsSum = props.levelsData.map(data => data.amountInCity).reduce((sum, x) => sum + x);
    const widths = props.levelsData.reduce((widthsByLevel, data) => {
        Object.assign(widthsByLevel, {
            [data.level]: data.amountInCity * 100 / unitsSum
        });
        return widthsByLevel;
    }, {});
    const singleLevels = props.levelsData.map(data =>
        <NumberOfSingleLevelUnits key={`${props.unit.key}-${data.level}`} numberOfUnits={data.amountInCity} level={data.level} width={`${widths[data.level]}%`}/>);
    return (
        <div className="NumberOfUnitsTile">
            <div className="icon">
                {unitIcon}
            </div>
            <div className="levels-data-box">
                <div className="levels-data">
                    {singleLevels}
                </div>
            </div>
            <div className="total-amount-box">
                <p>{unitsSum}</p>
            </div>
        </div>
    );
};

NumberOfUnitsTile.propTypes = {
    unit: PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        building: PropTypes.string.isRequired,
        buildingLabel: PropTypes.string.isRequired
    }),
    levelsData: PropTypes.arrayOf(PropTypes.shape({
        level: PropTypes.number,
        amountInCity: PropTypes.number
    }))
};

export default NumberOfUnitsTile;