import React, {useContext, useEffect, useState} from 'react';
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
import {UserContext} from "../../app/context/Context";

const Building = props => {
    const { building, buildingLabel, buildingLevel, recruitment, construction } = props;
    const [tasksData, setTasksData] = useState({
        tasks: []
    });
    const [unitsInBuilding, setUnitsInBuilding] = useState({});
    const [buildingsInCity, setBuildingsInCity] = useState({});
    const [recruitmentError, setRecruitmentError] = useState(false);
    const [constructionError, setConstructionError] = useState(false);
    const currentUserId = useContext(UserContext);

    const fetchTasksProgress = () => {
        apiCall(Api.cityBuilding.getTasksProgress, { pathVariables: { building, userId: currentUserId.id, cityId: currentUserId.currentCityId } })
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
        apiCall(Api.cityBuilding.getAvailableUnits, { pathVariables: { building, userId: currentUserId.id, cityId: currentUserId.currentCityId } })
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
        apiCall(Api.cityBuilding.getCityBuildings, { pathVariables: { userId: currentUserId.id, cityId: currentUserId.currentCityId } })
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
        apiCall(Api.cityUnit.recruitUnit, { data, pathVariables: { userId: currentUserId.id, cityId: currentUserId.currentCityId } })
            .then(response => {
                fetchTasksProgress();
                fetchAvailableUnits();
                setRecruitmentError(false);
            })
            .catch(error => {
                setRecruitmentError(true);
            });
    };

    const upgradeUnit = (data = {}) => {
        apiCall(Api.cityUnit.upgradeUnit, { data, pathVariables: { userId: currentUserId.id, cityId: currentUserId.currentCityId } })
            .then(response => {
                fetchTasksProgress();
                fetchAvailableUnits();
                setRecruitmentError(false);
            })
            .catch(error => {
                setRecruitmentError(true);
            });
    };

    const upgradeBuilding = (data = {}) => {
        apiCall(Api.cityBuilding.upgradeBuilding, { data, pathVariables: { userId: currentUserId.id, cityId: currentUserId.currentCityId } })
            .then(response => {
                fetchTasksProgress();
                fetchAvailableBuildings();
                setConstructionError(false);
            })
            .catch(error => {
                setConstructionError(true);
            });
    };

    useEffect(() => {
        setBuildingsInCity({});
        setUnitsInBuilding({});
        if(currentUserId.id) {
            fetchTasksProgress();
            if(recruitment) {
                fetchAvailableUnits();
            }
            if(construction) {
                fetchAvailableBuildings();
            }
        }
    }, [building]);

    useEffect(() => {
        const timeout = null;
        if(recruitmentError) {
            setTimeout(() => {
                setRecruitmentError(false);
            }, 3000);
        }
        return clearTimeout(timeout);
    }, [recruitmentError]);

    const existTaskOfTypeButNotInProgress = (tasks, type) => {
        return tasks.find(t => t.type === type) && !tasks.find(t => t.type === type && t.status === "InProgress");
    }
    useEffect(() => {
        let timeout;
        if(tasksData.tasks && tasksData.tasks.length > 0) {
            if(existTaskOfTypeButNotInProgress(tasksData.tasks, "recruitment")
                || existTaskOfTypeButNotInProgress(tasksData.tasks, "construction")
                || existTaskOfTypeButNotInProgress(tasksData.tasks, "promotion"))
            {
                timeout = setTimeout(() => {
                    fetchTasksProgress();
                }, 1000);
            }
        }
        return () => clearTimeout(timeout);
    }, [tasksData]);

    const buildingTasksProgress = <TasksProgress
        tasksData={tasksData}
        fetchTasksProgress={fetchTasksProgress}
        fetchAvailableUnits={fetchAvailableUnits}
        fetchAvailableBuildings={fetchAvailableBuildings}
    />;
    const buildingRecruitmentPanel = <BuildingRecruitmentPanel
        unitsInBuilding={unitsInBuilding}
        recruitUnits={recruitUnits}
        upgradeUnit={upgradeUnit}
    />;
    const buildingConstructionPanel = <BuildingConstructionPanel
        buildingsInCity={buildingsInCity}
        upgradeBuilding={upgradeBuilding}
    />;

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