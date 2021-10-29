import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Sensor } from '../../sensor';
import Home from './Home';
  

const NavScreen = () => <Switch>
    <Route path="/sensor" component={Sensor}/>
    <Route path="/" component={Home}/>
</Switch>

export default NavScreen;