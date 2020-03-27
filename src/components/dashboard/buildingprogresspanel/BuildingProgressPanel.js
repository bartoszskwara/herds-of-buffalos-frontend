import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './BuildingProgressPanel.scss';
import LoadingError from "../../lodingerror/LoadingError";
import Loader from "../../loader/Loader";
import {buildingIcons} from "../../../static/BuildingIcons";
import BuildingProgress from "./BuildingProgress";

const BuildingProgressPanel = props => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if(props.buildingProgressData) {
            isLoading(false);
        }
    }, [props.buildingProgressData]);

    if(props.error) {
        return <div className="BuildingProgressPanel"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="BuildingProgressPanel"><Loader /></div>
    }

    const buildingProgressList = props.buildingProgressData.map(data => <BuildingProgress key={data.building} progressData={data}/>)

    console.log(buildingProgressList);

    return (
        <div className="BuildingProgressPanel">
            {buildingProgressList}
        </div>
    );
};

BuildingProgressPanel.propTypes = {
    buildingProgressData: PropTypes.arrayOf(PropTypes.shape({
        building: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        currentLevel: PropTypes.number,
        nextLevel: PropTypes.number.isRequired,
        progress: PropTypes.number.isRequired
    })),
};

export default BuildingProgressPanel;