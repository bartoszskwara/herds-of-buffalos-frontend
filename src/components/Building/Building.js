import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Building.scss';
import RightDashboardPanel from "../dashboard/common/RightDashboardPanel";
import {Api, apiCall} from "../../api/Api";
import TasksProgress from "../TaskProgress/TasksProgress";
import DashboardPanel from "../dashboard/common/DashboardPanel";
import BuildingRecruitmentPanel from "./BuildingRecruitmentPanel";
import UnexpectedError from "../error/UnexpectedError";
import {buildingIcons} from "../../static/BuildingIcons";
import BuildingConstructionPanel from "./BuildingConstructionPanel";

const Building = props => {
    const { userId, cityId, building, buildingLabel, buildingLevel, recruitment, construction } = props;

    const [tasksData, setTasksData] = useState({});
    const [unitsInBuilding, setUnitsInBuilding] = useState({});
    const [buildingsInCity, setBuildingsInCity] = useState({});
    const [recruitmentError, setRecruitmentError] = useState(false);
    const [constructionError, setConstructionError] = useState(false);

    const fetchTasksProgress = () => {
        apiCall(Api.cityBuilding.getTasksProgress, { pathVariables: { building, userId, cityId } })
            .then(response => {
                setTasksData({
                    tasks: response.data.content
                });
            })
            .catch(error => {
                setTasksData({
                    error: "Error when fetching tasks progress data."
                })
            });
    };

    const fetchAvailableUnits = () => {
        apiCall(Api.cityBuilding.getAvailableUnits, { pathVariables: { building, userId, cityId } })
            .then(response => {
                setUnitsInBuilding({
                    units: response.data.content
                });
            })
            .catch(error => {
                setUnitsInBuilding({
                    error: "Error when fetching available units in building."
                })
            });
    };

    const fetchAvailableBuildings = () => {
        apiCall(Api.cityBuilding.getCityBuildings, { pathVariables: { userId, cityId } })
            .then(response => {
                setBuildingsInCity({
                    buildings: response.data.content
                });
            })
            .catch(error => {
                setBuildingsInCity({
                    error: "Error when fetching available buildings in city."
                })
            });
    };

    const recruitUnits = (data = {}) => {
        apiCall(Api.cityUnit.recruitUnit, { data, pathVariables: { userId, cityId } })
            .then(response => {
                fetchTasksProgress();
                setTimeout(() => fetchTasksProgress(), 5000);
                fetchAvailableUnits();
                setRecruitmentError(false);
            })
            .catch(error => {
                setRecruitmentError(true);
            });
    };

    const upgradeBuilding = (data = {}) => {
        apiCall(Api.cityBuilding.upgradeBuilding, { data, pathVariables: { userId, cityId } })
            .then(response => {
                fetchTasksProgress();
                setTimeout(() => fetchTasksProgress(), 5000);
                fetchAvailableBuildings();
                setConstructionError(false);
            })
            .catch(error => {
                setConstructionError(true);
            });
    };

    useEffect(() => {
        if(userId) {
            fetchTasksProgress();
            if(recruitment) {
                fetchAvailableUnits();
            }
            if(construction) {
                fetchAvailableBuildings();
            }
        }
    }, [userId]);

    useEffect(() => {
        const timeout = null;
        if(recruitmentError) {
            setTimeout(() => {
                setRecruitmentError(false);
            }, 3000);
        }
        return clearTimeout(timeout);
    }, [recruitmentError]);

    const buildingTasksProgress = <TasksProgress tasksData={tasksData} fetchTasksProgress={fetchTasksProgress} />;
    const buildingRecruitmentPanel = <BuildingRecruitmentPanel unitsInBuilding={unitsInBuilding} recruitUnits={recruitUnits} />;
    const buildingConstructionPanel = <BuildingConstructionPanel buildingsInCity={buildingsInCity} upgradeBuilding={upgradeBuilding} />;

    const icon = buildingIcons[building] || buildingIcons.unknown;
    const buildingIcon = React.cloneElement(icon.icon, { width: "50px", height: "50px"});

    return (
        <div className="Building">
            <div className="content">
                <div className="main-content">
                    <div className="recruitment-error">
                        {recruitmentError && <UnexpectedError message="Recruitment request failed" />}
                        {constructionError && <UnexpectedError message="Construction request failed" />}
                    </div>
                    <div className="building-header">
                        <div className="building-icon">{buildingIcon}</div>
                        <div className="building-name">
                            <p>{buildingLabel}</p>
                            {buildingLevel && <p>{buildingLevel}</p>}
                        </div>
                    </div>
                    <div className="building-dashboard">
                        <DashboardPanel panel={buildingRecruitmentPanel} name="RECRUITMENT" />
                        {buildingsInCity.buildings && <DashboardPanel panel={buildingConstructionPanel} name="CONSTRUCTION" />}
                    </div>
                </div>
                <div className="right-panel">
                    <RightDashboardPanel panel={buildingTasksProgress} name="TASKS PROGRESS" />
                </div>
            </div>
        </div>
    );
};

Building.propTypes = {
    userId: PropTypes.number,
    cityId: PropTypes.number,
    building: PropTypes.string.isRequired,
    buildingLabel: PropTypes.string.isRequired,
    buildingLevel: PropTypes.number,
    recruitment: PropTypes.bool,
    construction: PropTypes.bool
};
Building.defaultProps = {
    recruitment: true
};

export default Building;