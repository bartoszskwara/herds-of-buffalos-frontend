import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './CityUnitsPanel.scss';
import LoadingError from "../../lodingerror/LoadingError";
import Loader from "../../loader/Loader";
import NumberOfUnitsTile from "./NumberOfUnitsTile";
import DashboardPanelAccordion from "./DashboardPanelAccordion";

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

    const sectionsGrouped = props.cityUnitsData.reduce((sections, unitData) => {
        const currentValues = sections[unitData.unit.building] || [];
        const newValues = [unitData];
        const newValuesFiltered = newValues.filter((item) => currentValues.indexOf(item) < 0);

        return Object.assign(sections,
            {
                [unitData.unit.building]: [...currentValues, ...newValuesFiltered]
            })
    }, {});

    const buildingSections = Object.keys(sectionsGrouped).map(key => {

        return {
            key: key,
            buildingLabel: sectionsGrouped[key][0].unit.buildingLabel,
            units: sectionsGrouped[key].map(unitData => <NumberOfUnitsTile key={unitData.unit.key} unitData={unitData} />)
        }
    });
    return (
        <div className="CityUnitsPanel">
            <DashboardPanelAccordion sections={buildingSections} />
        </div>
    );
};

CityUnitsPanel.propTypes = {
    cityUnitsData: PropTypes.array,
    error: PropTypes.string
};

export default CityUnitsPanel;