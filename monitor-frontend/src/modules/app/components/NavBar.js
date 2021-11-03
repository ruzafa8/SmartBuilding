import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../../logo.jpeg';

const NavBarStyled = styled.div`
    background-color:#ebfbfa;
    width:100%;
    & > div {
        align-items:center;
        display:flex;
    }
`

const Icon = styled.img`
    padding:0px;
    margin-left:20px;
    margin-right:10px;
    width:60px;
    height:55px;
`

const StyledLink = styled(NavLink)`
    padding: 20px 10px;
    color:#34898d;
    text-decoration: none; /* no underline */
`

const NavBar = () => {
    return <NavBarStyled>
        <div>
            <Link to="/"><Icon src={Logo}/></Link>
            <StyledLink to="/sensor" activeStyle={{backgroundColor:"#53c5bf", color:"#ebfbfa"}}>Sensor</StyledLink>
            <StyledLink to="/camera" activeStyle={{backgroundColor:"#53c5bf", color:"#ebfbfa"}}>Camera</StyledLink>
            <StyledLink to="/neuronal-network" activeStyle={{backgroundColor:"#53c5bf", color:"#ebfbfa"}}>Neuronal Network</StyledLink>
            <StyledLink to="/admision" activeStyle={{backgroundColor:"#53c5bf", color:"#ebfbfa"}}>Admision List</StyledLink>
        </div>
    </NavBarStyled>
}
export default NavBar