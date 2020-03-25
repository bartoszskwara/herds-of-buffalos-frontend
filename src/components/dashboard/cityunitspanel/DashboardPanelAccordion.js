import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './DashboardPanelAccordion.scss';


class AccordionSection extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    toggleSection = () => {
        this.setState((state) => {
            return { active: !state.active }
        });
    };

    render() {
        return (
            <div className={`AccordionSection ${this.props.active ? "active" : "inactive"}`}>
                <div className="section-name" onClick={this.props.handleToggleSection}>{this.props.name}</div>
                <div className="units-list">
                    {this.props.unitList}
                </div>
            </div>
        );
    }
}

const DashboardPanelAccordion = props => {

    const [activeSection, setActiveSection] = useState("");

    const toggleSection = sectionKey => () => {
        setActiveSection(sectionKey === activeSection ? "" : sectionKey);
    };

    const sections = props.sections.map(section => <AccordionSection active={activeSection === section.key} handleToggleSection={toggleSection(section.key)} key={section.key} name={section.buildingLabel} unitList={section.units}/>);
    return (
        <div>
            {sections}
        </div>
    );
};

DashboardPanelAccordion.propTypes = {};

export default DashboardPanelAccordion;