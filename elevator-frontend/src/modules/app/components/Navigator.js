import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import backend from '../../../backend';

const Navigator = () => {
    const {id} = useParams();
    const navigator = useNavigate();
    const [floors, setFloors] = useState([]);
    useEffect(() => {
        backend.getElevator(id,({floors}) => {setFloors(floors)}, console.error);
    }, []);
    return <div style={{display:"flex", flexWrap:"wrap"}}>{floors.map(floor => <div style={
        {
            border:"solid", display:"flex", alignItems:"center", justifyContent:"center",
            margin:"10px", padding:"60px", borderRadius:"10px",  backgroundColor:"#53c5bf",
            color:"#ebfbfa", borderColor:"#34898d", fontSize:"40px"
        }
    } onClick={() => {
        backend.goToFloor(id,floor,console.log,console.error);
        navigator("/success")
    }}>{floor}</div>)}</div>
}

export default Navigator;