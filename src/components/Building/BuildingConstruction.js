import React from 'react';
import PropTypes from 'prop-types';
import './BuildingConstruction.scss';
import {resourceIcons} from "../../static/Resources";
import Button from "../button/Button";
import {buildingIcons} from "../../static/BuildingIcons";
import TableWithIcons from "./TableWithIcons";

const BuildingConstruction = props => {
    const {building, currentLevel, nextLevel, upgradeBuilding} = props;
    const handleUpgradeBuilding = () => {
        const data = {
            building: building.key,
            level: nextLevel.level
        };
        upgradeBuilding(data);
    };

    const buildingIconData = buildingIcons[building.key] || buildingIcons.unknown;

    const buildingIcon = React.cloneElement(
        buildingIconData.icon,
        { width: "50px", height: "50px" }
    );
    const upgradeCost = nextLevel ? Object.keys(resourceIcons).filter(key => key !== 'unknown').map(resourceIconKey => ({
        icon: resourceIcons[resourceIconKey],
        value: nextLevel.upgradingCost[resourceIconKey]
    })) : [];

    const upgradeCostTable = <TableWithIcons items={upgradeCost} />;
    return (
        <div className="BuildingConstruction">
            {(nextLevel && !nextLevel.upgradeRequirementsMet) && <div className="building-disabled"></div>}
            <div className="building-info-box">
                <div className="box-with-border icon">
                    {buildingIcon}
                </div>
                <div className="box-with-border level">
                    {currentLevel}
                </div>
                <div className="box-with-border name">
                    {building.label}
                </div>
            </div>
            <div className="box-with-border action-box">
                {nextLevel && <div className="upgrade-box">
                    <div className="upgrade-cost">
                        {upgradeCostTable}
                    </div>
                    <Button value={`UPGRADE TO LEVEL ${nextLevel.level}`} disabled={!nextLevel.upgradeRequirementsMet} onClick={handleUpgradeBuilding}/>
                </div>}
                {!nextLevel && <p>Maximum expansion level has been reached.</p>}
            </div>
        </div>
    );
};

BuildingConstruction.propTypes = {
    building: PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    currentLevel: PropTypes.number.isRequired,
    maxLevel: PropTypes.number.isRequired,
    nextLevel: PropTypes.shape({
        level: PropTypes.number.isRequired,
        upgradeRequirementsMet: PropTypes.bool.isRequired,
        upgradingCost: PropTypes.shape({
            wood: PropTypes.number.isRequired,
            clay: PropTypes.number.isRequired,
            iron: PropTypes.number.isRequired
        }).isRequired,
        upgradingTime: PropTypes.number.isRequired
    })
};
BuildingConstruction.defaultProps = {
    currentLevel: 0
};
export default BuildingConstruction;