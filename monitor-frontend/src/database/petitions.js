import { appFetch } from "./appFetch";

export const getSensorDetections = (onSuccess, onErrors) => 
    appFetch('/sensor',"GET",undefined, onSuccess,onErrors);

export const getSensorDetectionsPerHour = (onSuccess, onErrors) => 
    appFetch('/sensor?by=hour', "GET", undefined, onSuccess, onErrors);

export const getDetectionsType = (onSuccess, onErrors) =>
    appFetch('/detections',"GET", undefined, onSuccess, onErrors)

export const getUserList = (onSuccess, onErrors) =>
    appFetch('/user',"GET",undefined,onSuccess,onErrors);

export const modifyUser = (id, verified, onSuccess, onErrors) => 
    appFetch(`/user/${id}`, "PATCH", {verified}, onSuccess, onErrors);

export const deleteUser = (id, onSuccess, onErrors) =>
    appFetch(`/user/${id}`,"DELETE",undefined, onSuccess, onErrors);