import { appFetch } from "./appFetch";

export const getSensorDetections = (onSuccess, onErrors) => 
    appFetch('/sensor',"GET",undefined, onSuccess,onErrors);