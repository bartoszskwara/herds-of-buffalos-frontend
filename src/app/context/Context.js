import React from 'react';

export const UserContext = React.createContext({
    id: undefined,
    name: undefined,
    points: undefined,
    ranking: undefined,
    numberOfCities: undefined,
    currentCityId: undefined
});

export const CityContext = React.createContext({
    resources: {},
    buildings: {}
});