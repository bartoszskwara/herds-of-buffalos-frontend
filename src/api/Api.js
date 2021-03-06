import axios from "axios";

const parseUrl = (urlToParse, pathVariables) => {
    if(!urlToParse) {
        throw new Error('Empty url.');
    }
    let url = urlToParse;
    Object.keys(pathVariables).forEach(key => url = url.replace(`{${key}}`, pathVariables[key]));
    return url;
};

export const apiCall = (apiData, requestData) => {
    const parsedUrl = requestData ? parseUrl(apiData.url, requestData.pathVariables) : apiData.url;
    const requestConfig = {
        ...requestData,
        url: `${Api.server}${parsedUrl}`,
        method: apiData.method
    };

    return axios(requestConfig);
};

export const Api = {
    server: "http://localhost:8088",
    user: {
        getCurrentUser: {
            url: "/user/current",
            method: "get"
        }
    },
    city: {
        getCityByCityIdAndUserId: {
            url: "/user/{userId}/city/{cityId}",
            method: "get"
        }
    },
    cityUnit: {
        getAllCityUnits: {
            url: "/user/{userId}/city/{cityId}/unit",
            method: "get"
        },
        recruitUnit: {
            url: "/user/{userId}/city/{cityId}/unit",
            method: "post"
        },
        upgradeUnit: {
            url: "/user/{userId}/city/{cityId}/unit/promote",
            method: "post"
        },
        getCityRecruitmentProgress: {
            url: "/user/{userId}/city/{cityId}/unit/progress",
            method: "get"
        }
    },
    cityBuilding: {
        getCityBuildings: {
            url: "/user/{userId}/city/{cityId}/building",
            method: "get"
        },
        upgradeBuilding: {
            url: "/user/{userId}/city/{cityId}/building",
            method: "put"
        },
        getCityBuildingProgress: {
            url: "/user/{userId}/city/{cityId}/building/progress",
            method: "get"
        },
        getTasksProgress: {
            url: "/user/{userId}/city/{cityId}/building/{building}/tasks",
            method: "get"
        },
        getAvailableUnits: {
            url: "/user/{userId}/city/{cityId}/building/{building}/unit",
            method: "get"
        }
    }
};
