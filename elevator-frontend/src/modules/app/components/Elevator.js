import React, { useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import backend from '../../../backend'

const Elevator = () =>{ 
    const navigate = useNavigate();
    const {id, floor} = useParams();
    const [otp, setOtp] = useState();
    const [error, setError] = useState(undefined)

    return <>
        <div>Introduce the OTP:</div>
        <input onChange={event => setOtp(event.target.value)} />
        <div onClick={() => {
            backend.checkOTP(id,otp,floor, ({correct}) => {
                if(correct)
                    navigate(`/elevator/${id}/navigate`);
                else {
                    setError("The OTP introduced was incorrect");
                }
            }, console.error)
        }}>SUBMIT</div>
    </>
}
export default Elevator;