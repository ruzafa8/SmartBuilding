import { appFetch } from "./appFetch";

export const getSensorDetections = (onSuccess, onErrors) => 
    appFetch('/sensor',"GET",undefined, onSuccess,onErrors);

export const getSensorDetectionsPerHour = (onSuccess, onErrors) => 
    appFetch('/sensor/perhour', "POST", undefined, onSuccess, onErrors);