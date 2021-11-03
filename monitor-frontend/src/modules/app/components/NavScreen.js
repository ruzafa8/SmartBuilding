import React from 'react';
import {Switch, Route} from "react-router-dom";
import { Sensor, Camera, NeuronalNetwork } from '../../pages';
import Home from './Home';
  

const NavScreen = () => <Switch>
    <Route path="/sensor" component={Sensor}/>
    <Route path="/camera" component={Camera} />
    <Route path="/neuronal-network" component={NeuronalNetwork} />
    <Route path="/" component={Home}/>
</Switch>

export default NavScreen;