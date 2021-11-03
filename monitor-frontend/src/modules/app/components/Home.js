import React from "react";
import styled from "styled-components";
import logo from '../../../logo.jpeg'

const Body = styled.div`
    background-color:#ebfbfa;
    height:100%;
`

const Image = styled.img`
    width:40%;
`

const Home = () => <Body>{
    <Image src={logo} />
}</Body>

export default Home;