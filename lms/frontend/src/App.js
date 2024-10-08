import React from 'react';
import { observer } from "mobx-react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { Paths } from "./Paths";

import { Dashboard } from "./GUI/Components/Dashboard";
import Register from "./GUI/Components/Auth/Register";
import Login from "./GUI/Components/Auth/Login";
import ProductPage from "./GUI/Components/ProductPage";
import CreateProductPage from "./GUI/Components/CreateProductPage";

import { ConfigStore } from "./MODELS/ConfigStore";

// Классовый компонент App, обёрнутый в декоратор @observer из MobX
@observer
class App extends React.Component {
  render() {
    return (
      <Routes>
          <Route path={Paths.main.login.mask()} element={<Login />} />
          <Route path={Paths.main.register.mask()} element={<Register />} />
          <Route path={Paths.dashboard.mask()} element={<Dashboard />} />
          <Route path={ Paths.product.mask() } element={ <ProductPage /> } />
          <Route path={ Paths.create_product.mask() } element={<CreateProductPage />} />

          <Route path="/" element={<Navigate to={Paths.dashboard.path()} />} />
          <Route path="" element={<Navigate to={Paths.dashboard.path()} />} />
      </Routes>
    );
  }
}

export default App;
