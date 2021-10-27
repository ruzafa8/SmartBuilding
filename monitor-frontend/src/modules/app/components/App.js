import React, { useEffect, useState } from 'react';
import VerticalBar from '../../chart/components/VerticalBar'
import database from '../../../database'

const processDetections = (data, setFrecHours) => {
    const frecHours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    data.forEach(detection => {
        frecHours[new Date(detection.AT).getHours()] = detection.NUM;
    });
    console.log(frecHours); // select count(*), at from sensor group by hour(at);
    setFrecHours(frecHours)
}

const App = () => {
    const [frecHours, setFrecHours] = useState([]);
    useEffect(() => {
        database.getSensorDetections(res => {
            //processDetections(res, setFrecHours);
        }, console.error);
        database.getSensorDetectionsPerHour(res => {
            processDetections(res,setFrecHours);
        }, () => {
            const det = [];
            const nums = [1,2,3,4,6,8,10,13,16,19,23,24,25,21,17,14,11,9,7,5,4,3,2,1];
            for(let i = 0; i < 24; i++) {
                det.push({AT: new Date(`1999-03-29T${i < 10 ? `0${i}` : i }:00:00`), NUM:nums[i]*2})
            }
            processDetections(det,setFrecHours);
        });
    },[])

    return <div>
        <h1>
            Welcome 
        </h1>
        <VerticalBar values={frecHours}></VerticalBar>
    </div>
}
export default App;