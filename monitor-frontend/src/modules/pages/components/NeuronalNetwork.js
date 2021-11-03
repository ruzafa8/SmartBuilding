import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Donut } from "../../chart";
import database from "../../../database";
const Flex = styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content:center;
    width: 100%;
`

const Box = styled.div`
    width:40%;
`

const NeuronalNetwork = () => {
    const [detections, setDetections] = useState({belongs:[0,0], trueDetection:[0,0]});
    useEffect(() => {
        database.getDetectionsType(res => {
            setDetections({belongs: [res.BELONG, res.NOT_BELONG],
                 trueDetection: [res.TRUE_DETECTION, res.FALSE_DETECTION]});
        }, () => {
            setDetections({belongs:[230,20], trueDetection:[180,20]});
        });
    },[])
    return <Flex>
        <Box>
            <Donut labels={['Car detections', 'False detections']} data={detections.belongs}/>
        </Box>
        <Box>
            <Donut labels={['Cars that belongs', 'Cars that don\'t belong']} data={detections.trueDetection}/>
        </Box>
    </Flex>
}
export default NeuronalNetwork;