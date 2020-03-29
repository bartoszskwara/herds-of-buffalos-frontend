import React from 'react';
import PropTypes from 'prop-types';
import './NumberOfSingleLevelUnits.scss';

const levelColors = {
    1: "119, 186, 154",
    2: "119, 170, 186",
    3: "186, 159, 119",
    4: "186, 130, 119",
    5: "149, 119, 186",
};

const convertToRoman = num => {
    const decimalValue = [10, 9, 5, 4, 1];
    const romanNumeral = ["X", "IX", "V", "IV", "I"];
    let romanized = "";

    decimalValue.forEach((decimal, index) => {
        while (decimal <= num) {
            romanized += romanNumeral[index];
            num -= decimal;
        }
    });

    return romanized;
};

const NumberOfSingleLevelUnits = props => {
    let level = convertToRoman(props.level);
    return (
        <div className="NumberOfSingleLevelUnits" style={{width: props.width, background: `rgba(${levelColors[props.level]},0.3)`}}>
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