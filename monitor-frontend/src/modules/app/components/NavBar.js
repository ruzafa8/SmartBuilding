import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import Logo from '../../../logo.jpeg';

const NavBarStyled = styled.div`
    background-color:${({theme}) => theme.p_light};
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
    color:${({theme}) => theme.p_dark};
    text-decoration: none; /* no underline */
`

const NavBar = () => {
    const theme = useContext(ThemeContext);
    return <NavBarStyled>
        <div>
            <Link to="/"><Icon src={Logo}/></Link>
            <StyledLink to="/sensor" activeStyle={{backgroundColor:theme.primary, color:theme.p_text}}>Sensor</StyledLink>
            <StyledLink to="/camera" activeStyle={{backgroundColor:theme.primary, color:theme.p_text}}>Camera</StyledLink>
            <StyledLink to="/neuronal-network" activeStyle={{backgroundColor:theme.primary, color:theme.p_text}}>Neuronal Network</StyledLink>
            <StyledLink to="/admision" activeStyle={{backgroundColor:theme.primary, color:theme.p_text}}>Admision List</StyledLink>
        </div>
    </NavBarStyled>
}
export default NavBar