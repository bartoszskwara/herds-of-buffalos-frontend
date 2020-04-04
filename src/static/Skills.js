import React from 'react';
import { ReactComponent as Attack } from '../images/skills/attack.svg';
import { ReactComponent as Defense } from '../images/skills/defense.svg';
import { ReactComponent as Health } from '../images/skills/health.svg';
import { ReactComponent as Unknown } from '../images/unknown.svg';

export const skillIcons = {
    attack: {
        key: "attack",
        icon: <Attack />
    },
    defense: {
        key: "defense",
        icon: <Defense />
    },
    health: {
        key: "health",
        icon: <Health />
    },
    unknown: {
        key: "unknown",
        icon: <Unknown className="unit-icon-svg" />
    }
};