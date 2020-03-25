import React from 'react';
import { ReactComponent as Rifle } from '../images/unit/rifle.svg';
import { ReactComponent as Binoculars } from '../images/unit/binoculars.svg';
import { ReactComponent as Target } from '../images/unit/target.svg';
import { ReactComponent as Privacy } from '../images/unit/privacy.svg';
import { ReactComponent as Spear } from '../images/unit/spear.svg';
import { ReactComponent as Axe } from '../images/unit/axe.svg';

export const unitIcons = {
    stormTrooper: {
        key: "stormTrooper",
        icon: <Rifle className="unit-icon-svg" />
    },
    spy: {
        key: "spy",
        icon: <Binoculars className="unit-icon-svg" />
    },
    archer: {
        key: "archer",
        icon: <Target className="unit-icon-svg" />
    },
    spearman: {
        key: "spearman",
        icon: <Spear className="unit-icon-svg" />
    },
    axeman: {
        key: "axeman",
        icon: <Axe className="unit-icon-svg" />
    },
    unknown: {
        key: "unknown",
        icon: <Privacy className="unit-icon-svg" />
    }
};