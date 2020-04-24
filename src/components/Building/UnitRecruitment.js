import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './UnitRecruitment.scss';
import {levelColorsRGB, unitIcons} from "../../static/Unit";
import {convertToRomanian} from "../dashboard/common/romanianNumber";
import {skillIcons} from "../../static/Skills";
import {resourceIcons} from "../../static/Resources";
import Button from "../button/Button";
import TableWithIcons from "./TableWithIcons";

const UnitRecruitment = props => {
    const [numberToRecruit, setNumberToRecruit] = useState("");
    const {level, unit} = props;
    const handleMaxToRecruitClick = () => setNumberToRecruit(level.maxToRecruit);
    const handleNumberToRecruitChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if(Number.isNaN(value)) {
            setNumberToRecruit("");
        } else if(value <= level.maxToRecruit) {
            setNumberToRecruit(value);
        }
    };

    const recruitUnits = () => {
        if(numberToRecruit <= 0) {
            return;
        }
        const data = {
            unit: unit.key,
            level: level.level,
            amount: numberToRecruit
        };
        props.recruitUnits(data);
        setNumberToRecruit("");
    };

    const upgradeUnit = () => {
        const data = {
            unit: unit.key
        };
        props.upgradeUnit(data);
    };

    const unitIconData = unitIcons[unit.key] || unitIcons.unknown;
    const unitIcon = React.cloneElement(
        unitIconData.icon,
        { width: "50px", height: "50px" }
    );
    const romanianLevel = convertToRomanian(level.level);

    const skills = Object.keys(skillIcons).filter(key => key !== 'unknown').map(skillIconKey => ({
        icon: skillIcons[skillIconKey],
        value: level.skills[skillIconKey]
    }));
    const cost = Object.keys(resourceIcons).filter(key => key !== 'unknown').map(resourceIconKey => ({
        icon: resourceIcons[resourceIconKey],
        value: level.recruitmentCost[resourceIconKey]
    }));
    const upgradeCost = Object.keys(resourceIcons).filter(key => key !== 'unknown').map(resourceIconKey => ({
        icon: resourceIcons[resourceIconKey],
        value: level.upgradingCost[resourceIconKey]
    }));

    const styles = {
        background: `rgba(${levelColorsRGB[level.level]},0.3)`
    };
    const skillsTable = <TableWithIcons items={skills} />;
    const costTable = <TableWithIcons items={cost} />;
    const upgradeCostTable = <TableWithIcons items={upgradeCost} />;
    return (
        <div className="UnitRecruitment">
            {(!level.enabled && !level.upgradeRequirementsMet) && <div className="unit-disabled"></div>}
            <div className="unit-info-box">
                <div className="box-with-border icon">
                    {unitIcon}
                </div>
                <div className="box-with-border level" style={styles}>
                    {romanianLevel}
                </div>
                <div className="box-with-border skills-cost-box">
                    <div className="skills">
                        {skillsTable}
                    </div>
                    <div className="cost">
                        {costTable}
                    </div>
                </div>
            </div>
            <div className="box-with-border unit-amount">
                <p>{level.amountInCity}</p>
            </div>
            <div className="box-with-border action-box">
                {level.enabled &&
                <div className="recruitment-box">
                    <div className="recruitment-input">
                        <input type="text" name={`${unit.key}-${level.level}-recruit`} pattern="[0-9]*" value={numberToRecruit} onChange={handleNumberToRecruitChange}/>
                        <p onClick={handleMaxToRecruitClick}>( {level.maxToRecruit} )</p>
                    </div>
                    <Button value="RECRUIT" onClick={recruitUnits}/>
                </div>}
                {(!level.enabled) && <div className="upgrade-box">
                    <div className="upgradeCost">
                        {upgradeCostTable}
                    </div>
                    <Button value="UPGRADE" disabled={!level.upgradeRequirementsMet} onClick={upgradeUnit}/>
                </div>}
            </div>
        </div>
    );
};

UnitRecruitment.propTypes = {
    unit: PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        building: PropTypes.string.isRequired
    }).isRequired,
    maxLevel: PropTypes.number.isRequired,
    level: PropTypes.shape({
        level: PropTypes.number.isRequired,
        enabled: PropTypes.bool.isRequired,
        upgradeRequirementsMet: PropTypes.bool.isRequired,
        amountInCity: PropTypes.number.isRequired,
        skills: PropTypes.shape({
            attack: PropTypes.number.isRequired,
            defense: PropTypes.number.isRequired,
            health: PropTypes.number.isRequired
        }).isRequired,
        recruitmentCost: PropTypes.shape({
            wood: PropTypes.number.isRequired,
            clay: PropTypes.number.isRequired,
            iron: PropTypes.number.isRequired
        }).isRequired,
        upgradingCost: PropTypes.shape({
            wood: PropTypes.number.isRequired,
            clay: PropTypes.number.isRequired,
            iron: PropTypes.number.isRequired
        }).isRequired,
        maxToRecruit: PropTypes.number.isRequired
    }),
    recruitUnits: PropTypes.func,
    upgradeUnit: PropTypes.func
};

export default UnitRecruitment;