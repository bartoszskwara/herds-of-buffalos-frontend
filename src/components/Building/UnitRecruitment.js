import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './UnitRecruitment.scss';
import {levelColorsRGB, unitIcons} from "../../static/Unit";
import {convertToRomanian} from "../dashboard/common/romanianNumber";
import {skillIcons} from "../../static/Skills";
import {resourceIcons} from "../../static/Resources";
import Button from "../button/Button";

const TableWithIcons = (props) => {
    const items = props.items.map(i => ({
        key: i.icon.key,
        icon: React.cloneElement(i.icon.icon, { width: "23px", height: "23px"} ),
        value: i.value
    })).map(i => (
        <div className="item" key={i.key}>
            <div className="item-value">
                {i.value}
            </div>
            <div className="item-icon">
                {i.icon}
            </div>
        </div>
    ));
    return (
        <div className="TableWithIcons">
            {items}
        </div>
    );
};
TableWithIcons.propTypes = {
    items: PropTypes.array.isRequired
};

const UnitRecruitment = props => {
    const [numberToRecruit, setNumberToRecruit] = useState("");
    const handleMaxToRecruitClick = () => setNumberToRecruit(props.level.maxToRecruit);
    const handleNumberToRecruitChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if(Number.isNaN(value)) {
            setNumberToRecruit("");
        } else if(value <= props.level.maxToRecruit) {
            setNumberToRecruit(value);
        }
    };

    const recruitUnits = () => {
        if(numberToRecruit <= 0) {
            return;
        }
        const data = {
            unit: props.unit.key,
            level: props.level.level,
            amount: numberToRecruit
        };
        props.recruitUnits(data);
        setNumberToRecruit("");
    };

    const unitIconData = unitIcons[props.unit.key] || unitIcons.unknown;
    const unitIcon = React.cloneElement(
        unitIconData.icon,
        { width: "50px", height: "50px" }
    );
    const level = convertToRomanian(props.level.level);

    const skills = Object.keys(skillIcons).filter(key => key !== 'unknown').map(skillIconKey => ({
        icon: skillIcons[skillIconKey],
        value: props.level.skills[skillIconKey]
    }));
    const cost = Object.keys(resourceIcons).filter(key => key !== 'unknown').map(resourceIconKey => ({
        icon: resourceIcons[resourceIconKey],
        value: props.level.recruitmentCost[resourceIconKey]
    }));
    const upgradeCost = Object.keys(resourceIcons).filter(key => key !== 'unknown').map(resourceIconKey => ({
        icon: resourceIcons[resourceIconKey],
        value: props.level.upgradingCost[resourceIconKey]
    }));

    const styles = {
        background: `rgba(${levelColorsRGB[props.level.level]},0.3)`
    };
    const skillsTable = <TableWithIcons items={skills} />;
    const costTable = <TableWithIcons items={cost} />;
    const upgradeCostTable = <TableWithIcons items={upgradeCost} />;
    return (
        <div className="UnitRecruitment">
            {(!props.level.enabled && !props.level.upgradeRequirementsMet) && <div className="unit-disabled"></div>}
            <div className="unit-info-box">
                <div className="box-with-border icon">
                    {unitIcon}
                </div>
                <div className="box-with-border level" style={styles}>
                    {level}
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
                <p>{props.level.amountInCity}</p>
            </div>
            <div className="box-with-border action-box">
                {props.level.enabled &&
                <div className="recruitment-box">
                    <div className="recruitment-input">
                        <input type="text" name={`${props.unit.key}-${props.level.level}-recruit`} pattern="[0-9]*" value={numberToRecruit} onChange={handleNumberToRecruitChange}/>
                        <p onClick={handleMaxToRecruitClick}>( {props.level.maxToRecruit} )</p>
                    </div>
                    <Button value="RECRUIT" onClick={recruitUnits}/>
                </div>}
                {(!props.level.enabled) && <div className="upgrade-box">
                    <div className="upgradeCost">
                        {upgradeCostTable}
                    </div>
                    <Button value="UPGRADE" disabled={!props.level.upgradeRequirementsMet} />
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
    })
};

export default UnitRecruitment;