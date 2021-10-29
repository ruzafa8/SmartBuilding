import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const NavBarStyled = styled.div`
    background-color:#D3D3D3;
    display:flex;
    width:100%;
    & > ul {
        display:flex;
        list-style:none;
    }

    & > ul > li {
        padding:0px 10px;

    }
`

const NavBar = () => <NavBarStyled>
    <ul>
        <li><Link to="/sensor">Sensor</Link></li>
        <li>Camera</li>
        <li>Admision List</li>
    </ul>
</NavBarStyled>

export default NavBar