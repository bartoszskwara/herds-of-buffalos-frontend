import React from 'react';
import PropTypes from 'prop-types';
import './NumberOfSingleLevelUnits.scss';
import {convertToRomanian} from "../common/romanianNumber";
import {levelColorsRGB} from "../../../static/Unit";

const NumberOfSingleLevelUnits = props => {
    let level = convertToRomanian(props.level);
    return (
        <div className="NumberOfSingleLevelUnits" style={{width: props.width, background: `rgba(${levelColorsRGB[props.level]},0.3)`}}>
            <div className="amount">
                <p>{props.numberOfUnits}</p>
            </div>
            <div className="level">
                <p>{level}</p>
            </div>
        </div>
    );
};

NumberOfSingleLevelUnits.propTypes = {
    numberOfUnits: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    width: PropTypes.string
};

export default NumberOfSingleLevelUnits;