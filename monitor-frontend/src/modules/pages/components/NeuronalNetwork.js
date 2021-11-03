import React from "react";
import styled from "styled-components";
import { Donut } from "../../chart";

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

const NeuronalNetwork = () => <Flex>
    <Box>
        <Donut labels={['Car detections', 'False detections']} data={[230,20]}/>
    </Box>
    <Box>
        <Donut labels={['Cars that belongs', 'Cars that don\'t belong']} data={[180,20]}/>
    </Box>
</Flex>

export default NeuronalNetwork;