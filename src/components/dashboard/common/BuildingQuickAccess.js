import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import './BuildingQuickAccess.scss';
import {buildingIcons} from "../../../static/BuildingIcons";
import {CityContext} from "../../../app/context/Context";

const BuildingIcon = (props) => {
    const {buildingKey, enabled, onMouseOver, onMouseOut} = props;
    const history = useHistory();
    const icon = buildingIcons[buildingKey] || buildingIcons.unknown;
    const iconElement = React.cloneElement(icon.icon, {
        width: "30px",
        height: "30px"
    });
    const handleClick = () => {
        history.push(buildingKey);
    }
    return (
        <NavLink to={`/building/${buildingKey}`}>
            <div className={`BuildingIcon ${enabled ? "enabled" : "disabled"}`} onMouseOver={onMouseOver} onMouseOut={onMouseOut} >
                {!enabled && <div className="disabled-box"></div>}
                {iconElement}
            </div>
        </NavLink>
    );
};
BuildingIcon.propTypes = {
    buildingKey: PropTypes.string,
    enabled: PropTypes.bool,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func
};

const BuildingQuickAccess = () => {
    const [activeBuilding, setActiveBuilding] = useState({
        building: {}
    });
    const cityData = useContext(CityContext);

    const handleMouseOver = (building) => () => {
        setActiveBuilding(building);
    };
    const handleMouseOut = () => {
        setActiveBuilding({ building: {} });
    };

    const buildingsList = cityData.buildings.map(b => {
        const handleOver = handleMouseOver(b);
        return <BuildingIcon key={b.building.key} buildingKey={b.building.key} enabled={b.enabled} onMouseOver={handleOver} onMouseOut={handleMouseOut} />
    });
    return (
        <div className="BuildingQuickAccess">
            <div className="list">
                {buildingsList}
            </div>
            {activeBuilding.building.label && <div className="info-box">
                <p className={`${!activeBuilding.enabled ? "disabled" : ""}`}>
                    {activeBuilding.building.label}
                    {activeBuilding.enabled && <span> Level {activeBuilding.currentLevel}</span>}
                </p>
            </div>}
        </div>
    );
};

export default BuildingQuickAccess;