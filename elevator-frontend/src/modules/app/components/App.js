import React from 'react';
import {Route, Routes} from "react-router-dom";
import Elevator from './Elevator';
import Navigator from './Navigator';
import Success from './Success';
import Waiting from './Waiting';

const App = () => <Routes>
    <Route path="/elevator/:id/:floor" element={<Elevator/>} />
    <Route path="/elevator/:id/navigate" element={<Navigator/>} />
    <Route path="/success" element={<Success/>} />
    <Route path="/elevator/:id/waiting" element={<Waiting/>} />
</Routes>

export default App;