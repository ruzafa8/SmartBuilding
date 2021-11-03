import React from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';
import NavScreen from './NavScreen';

const Body = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items:center;
`

const App = () =>  <Body>
    <NavBar/>
    <NavScreen/>
</Body>

export default App;