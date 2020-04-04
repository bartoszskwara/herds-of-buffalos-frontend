import React from 'react';
import PropTypes from 'prop-types';
import './Building.scss';
import {
    useParams
} from "react-router-dom";
import Barracks from "./Barracks/Barracks";
import NotFound from "../notfound/NotFound";

const Building = props => {
    const { building } = useParams();

    const buildingComponentMap = {
        barracks: <Barracks userId={props.currentUserData.id} cityId={props.currentUserData.currentCityId}/>
    };

    const buildingComponent = buildingComponentMap[building] || <NotFound />;
    return (
        <div className="Building">
            {buildingComponent}
        </div>
    );
};

Building.propTypes = {
    currentUserData: PropTypes.object.isRequired
};

export default Building;