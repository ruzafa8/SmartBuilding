import React from 'react';
import {Route, Routes} from "react-router-dom";
import Elevator from './Elevator';
import Navigator from './Navigator';

const App = () => <Routes>
    <Route path="/elevator/:id/:floor" element={<Elevator/>} />
    <Route path="/elevator/:id/navigate" element={<Navigator/>} />
</Routes>

export default App;