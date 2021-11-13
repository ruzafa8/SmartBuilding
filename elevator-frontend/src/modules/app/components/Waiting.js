import React from "react";
import {useParams, useNavigate} from 'react-router-dom';

const Waiting = () =>{
    const navigate = useNavigate();
    const {id} = useParams();
    return  <div style={{
        padding:"20px", fontSize:"30px", textAlign:"center",
        border:"solid", backgroundColor:"#53c5bf",
        color:"#ebfbfa", borderColor:"#34898d"}} onClick={() => {
            navigate(`/elevator/${id}/navigate`)
        }}>
    Click here when the elevator arrives
</div>
}
export default Waiting;