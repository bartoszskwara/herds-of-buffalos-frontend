import React from 'react';
import { ReactComponent as Wood } from '../images/resources/wood.svg';
import { ReactComponent as Clay } from '../images/resources/clay.svg';
import { ReactComponent as Iron } from '../images/resources/iron.svg';
import { ReactComponent as Unknown } from '../images/unknown.svg';

export const resourceIcons = {
    wood: {
        key: "wood",
        icon: <Wood />
    },
    clay: {
        key: "clay",
        icon: <Clay />
    },
    iron: {
        key: "iron",
        icon: <Iron />
    },
    unknown: {
        key: "unknown",
        icon: <Unknown className="unit-icon-svg" />
    }
};