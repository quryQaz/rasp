import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Paths} from "./Paths";
import {ComponentBack} from "./ComponentBack"

import Dashboard from "./GUI/Components/Dashboard"

import {ConfigStore} from "./MODELS/ConfigStore";

function App() {
  return (
      <Routes>
          <Route path={ Paths.dashboard.mask() } element={ <Dashboard/> } />
          <Route path={"/"} element={<Navigate to={Paths.dashboard.path()}/>} />
          <Route path={""} element={<Navigate to={Paths.dashboard.path()}/>} />
      </Routes>
  );
}

export default App;
