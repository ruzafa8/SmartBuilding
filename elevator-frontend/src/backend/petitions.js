import { appFetch } from "./appFetch";

export const getElevator = (id, onSuccess, onErrors) => 
    appFetch(`/elevator/${id}`,"GET",undefined, onSuccess,onErrors);

export const checkOTP = (id, otp, currentFloor, onSuccess, onErrors) => 
    appFetch(`/elevator/${id}/check-otp`,"POST",{otp, currentFloor}, onSuccess,onErrors);

export const goToFloor = (id, floor, onSuccess, onErrors) => 
    appFetch(`/elevator/${id}/go-to`,"POST",{desiredFloor:floor}, onSuccess,onErrors);