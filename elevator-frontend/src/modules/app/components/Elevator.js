import React, { useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import backend from '../../../backend'

const Elevator = () =>{ 
    const navigate = useNavigate();
    const {id, floor} = useParams();
    const [otp, setOtp] = useState();
    const [error, setError] = useState(undefined)

    return <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <div style={{fontSize:"20px", marginBottom:"10px", marginTop:"40px"}}>Introduce the OTP:</div>
        <input type="number" style={{fontSize:"50px", width:"115px"}} onChange={event => setOtp(event.target.value)} />
        <div onClick={() => {
           backend.checkOTP(id,otp,floor, ({correct}) => {
               if(correct)
                   navigate(`/elevator/${id}/waiting`);
               else {
                   setError("The OTP introduced was incorrect");
                   
               }
           }, console.error);
        }} style={{border:"solid", padding:"20px 50px", fontSize:"20px",
                marginTop:"20px", borderRadius:"5px", backgroundColor:"#53c5bf",
                color:"#ebfbfa", borderColor:"#34898d"
                }}>SUBMIT</div>
    </div>
}
export default Elevator;