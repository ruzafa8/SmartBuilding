import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import backend from '../../../backend';

const Navigator = () => {
    const {id} = useParams();
    const [floors, setFloors] = useState([]);
    useEffect(() => {
        backend.getElevator(id,({floors}) => {setFloors(floors)}, console.error);
    }, []);
    return <>{floors.map(floor => <div>{floor}</div>)}</>
}

export default Navigator;