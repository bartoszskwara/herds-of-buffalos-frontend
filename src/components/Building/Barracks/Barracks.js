import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Barracks.scss';
import RightDashboardPanel from "../../dashboard/common/RightDashboardPanel";
import {Api, apiCall} from "../../../api/Api";
import BarracksTasksProgress from "./BarracksTasksProgress";
import LoadingError from "../../error/LoadingError";
import Loader from "../../loader/Loader";
import DashboardPanel from "../../dashboard/common/DashboardPanel";
import BarracksRecruitmentPanel from "./BarracksRecruitmentPanel";
import UnexpectedError from "../../error/UnexpectedError";

const Barracks = props => {
    const [tasksData, setTasksData] = useState({});
    const [unitsInBuilding, setUnitsInBuilding] = useState({});
    const [recruitmentError, setRecruitmentError] = useState(false);

    const fetchTasksProgress = () => {
        apiCall(Api.cityBuilding.getTasksProgress, { pathVariables: { building: "barracks", userId: props.userId, cityId: props.cityId } })
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
        apiCall(Api.cityBuilding.getAvailableUnits, { pathVariables: { userId: props.userId, cityId: props.cityId, building: "barracks" } })
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

    const recruitUnits = (data = {}) => {
        apiCall(Api.cityUnit.recruitUnit, { data, pathVariables: { userId: props.userId, cityId: props.cityId } })
            .then(response => {
                fetchTasksProgress();
                fetchAvailableUnits();
                setRecruitmentError(false);
            })
            .catch(error => {
                setRecruitmentError(true);
            });
    };

    useEffect(() => {
        if(props.userId) {
            fetchTasksProgress();
            fetchAvailableUnits();
        }
    }, [props.userId]);

    useEffect(() => {
        const timeout = null;
        if(recruitmentError) {
            setTimeout(() => {
                setRecruitmentError(false);
            }, 3000);
        }
        return clearTimeout(timeout);
    }, [recruitmentError]);

    const barracksTasksProgress = <BarracksTasksProgress tasksData={tasksData} fetchTasksProgress={fetchTasksProgress} />;
    const barracksRecruitmentPanel = <BarracksRecruitmentPanel
        unitsInBuilding={unitsInBuilding}
        recruitUnits={recruitUnits}
    />;

    return (
        <div className="Barracks">
            <div className="content">
                <div className="main-content">
                    <div className="recruitment-error">
                        {recruitmentError && <UnexpectedError message="Recruitment request failed" />}
                    </div>
                    <div className="building-name">BARRACKS</div>
                    <div className="building-dashboard">
                        <DashboardPanel panel={barracksRecruitmentPanel} name="RECRUITMENT" />
                    </div>
                </div>
                <div className="right-panel">
                    <RightDashboardPanel panel={barracksTasksProgress} name="TASKS PROGRESS" />
                </div>
            </div>
        </div>
    );
};

Barracks.propTypes = {
    userId: PropTypes.number,
    cityId: PropTypes.number
};

export default Barracks;