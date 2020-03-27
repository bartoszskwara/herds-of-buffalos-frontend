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
        }
    },
    cityBuilding: {
        getCityBuildingProgress: {
            url: "/user/{userId}/city/{cityId}/building/progress",
            method: "get"
        }
    }
};
