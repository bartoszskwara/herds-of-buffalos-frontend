import React from 'react';
import { ReactComponent as Barracks } from '../images/building/barracks.svg';
import { ReactComponent as Armory } from '../images/building/armory.svg';
import { ReactComponent as Ironworks } from '../images/building/ironworks.svg';
import { ReactComponent as Fountain } from '../images/building/fountain.svg';
import { ReactComponent as Granary } from '../images/building/granary.svg';
import { ReactComponent as Brickyard } from '../images/building/brickyard.svg';
import { ReactComponent as Unknown } from '../images/unknown.svg';

export const buildingIcons = {
    barracks: {
        key: "barracks",
        icon: <Barracks className="unit-icon-svg" />
    },
    armory: {
        key: "armory",
        icon: <Armory className="unit-icon-svg" />
    },
    fountain: {
        key: "fountain",
        icon: <Fountain className="unit-icon-svg" />
    },
    granary: {
        key: "granary",
        icon: <Granary className="unit-icon-svg" />
    },
    brickyard: {
        key: "brickyard",
        icon: <Brickyard className="unit-icon-svg" />
    },
    ironworks: {
        key: "ironworks",
        icon: <Ironworks className="unit-icon-svg" />
    },
    unknown: {
        key: "unknown",
        icon: <Unknown className="unit-icon-svg" />
    }
};