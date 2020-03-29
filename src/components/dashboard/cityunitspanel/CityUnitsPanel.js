import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CityUnitsPanel.scss';
import LoadingError from "../../lodingerror/LoadingError";
import Loader from "../../loader/Loader";
import NumberOfUnitsTile from "./NumberOfUnitsTile";

const CityUnitsPanel = props => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        if(props.cityUnitsData) {
            isLoading(false);
        }
    }, [props.cityUnitsData]);

    if(props.error) {
        return <div className="CityHeadline"><LoadingError error={props.error} /></div>
    } else if(loading) {
        return <div className="CityHeadline"><Loader /></div>
    }

    const unitTiles = props.cityUnitsData.map(data => <NumberOfUnitsTile key={data.unit.key} unit={data.unit} levelsData={data.levelsData}/>)

    return (
        <div className="CityUnitsPanel">
            {unitTiles}
        </div>
    );
};

CityUnitsPanel.propTypes = {
    cityUnitsData: PropTypes.arrayOf(PropTypes.shape({
        unit: PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            building: PropTypes.string.isRequired,
            buildingLabel: PropTypes.string.isRequired
        }),
        levelsData: PropTypes.arrayOf(PropTypes.shape({
            level: PropTypes.number,
            amountInCity: PropTypes.number
        }))
    })),
    error: PropTypes.string
};

export default CityUnitsPanel;