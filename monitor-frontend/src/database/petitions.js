import { appFetch } from "./appFetch";

export const getSensorDetections = (onSuccess, onErrors) => 
    appFetch('/sensor',"GET",undefined, onSuccess,onErrors);

export const getSensorDetectionsPerHour = (onSuccess, onErrors) => 
    appFetch('/sensor?by=hour', "GET", undefined, onSuccess, onErrors);

export const getDetectionsType = (onSuccess, onErrors) =>
    appFetch('/detections',"GET", undefined, onSuccess, onErrors)