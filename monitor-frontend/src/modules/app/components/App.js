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
            console.log("usted");
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