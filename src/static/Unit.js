import React from 'react';
import { ReactComponent as Rifle } from '../images/unit/rifle.svg';
import { ReactComponent as Binoculars } from '../images/unit/binoculars.svg';
import { ReactComponent as Archer } from '../images/unit/archer.svg';
import { ReactComponent as Unknown } from '../images/unknown.svg';
import { ReactComponent as Spearman } from '../images/unit/spearman.svg';
import { ReactComponent as Axe } from '../images/unit/axe.svg';
import { ReactComponent as Citizen } from '../images/unit/citizen.svg';
import { ReactComponent as GreatBuffalo } from '../images/unit/greatBuffalo.svg';
import { ReactComponent as PlasmaCannon } from '../images/unit/tank.svg';
import { ReactComponent as HeavyBuffalo } from '../images/unit/heavyBuffalo.svg';
import { ReactComponent as AirCraft } from '../images/unit/aircraft.svg';
import { ReactComponent as Bomb } from '../images/unit/bomb.svg';
import { ReactComponent as Guardsman } from '../images/unit/guardsman.svg';
import { ReactComponent as LightBuffalo } from '../images/unit/lightBuffalo.svg';
import { ReactComponent as Crusier } from '../images/unit/crusier.svg';
import { ReactComponent as Sailboat } from '../images/unit/sailboat.svg';
import { ReactComponent as Frigate } from '../images/unit/frigate.svg';

export const levelColorsRGB = {
    1: "119, 186, 154",
    2: "119, 170, 186",
    3: "186, 159, 119",
    4: "186, 130, 119",
    5: "149, 119, 186",
};

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
        icon: <Archer className="unit-icon-svg" />
    },
    spearman: {
        key: "spearman",
        icon: <Spearman className="unit-icon-svg" />
    },
    axeman: {
        key: "axeman",
        icon: <Axe className="unit-icon-svg" />
    },
    citizen: {
        key: "citizen",
        icon: <Citizen className="unit-icon-svg" />
    },
    greatBuffalo: {
        key: "greatBuffalo",
        icon: <GreatBuffalo className="unit-icon-svg" />
    },
    plasmaCannon: {
        key: "plasmaCannon",
        icon: <PlasmaCannon className="unit-icon-svg" />
    },
    heavyBuffalo: {
        key: "heavyBuffalo",
        icon: <HeavyBuffalo className="unit-icon-svg" />
    },
    destroyer: {
        key: "destroyer",
        icon: <AirCraft className="unit-icon-svg" />
    },
    bomber: {
        key: "bomber",
        icon: <Bomb className="unit-icon-svg" />
    },
    guardsman: {
        key: "guardsman",
        icon: <Guardsman className="unit-icon-svg" />
    },
    lightBuffalo: {
        key: "lightBuffalo",
        icon: <LightBuffalo className="unit-icon-svg" />
    },
    warship: {
        key: "crusier",
        icon: <Crusier className="unit-icon-svg" />
    },
    sailboat: {
        key: "sailboat",
        icon: <Sailboat className="unit-icon-svg" />
    },
    merchantShip: {
        key: "frigate",
        icon: <Frigate className="unit-icon-svg" />
    },
    unknown: {
        key: "unknown",
        icon: <Unknown className="unit-icon-svg" />
    }
};