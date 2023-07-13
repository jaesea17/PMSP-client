import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import { PrivateRoutes } from './utils/PrivateRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';


function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="update-product" element={<UpdateProduct />} />
      </Route>
    </Routes>
  )
}

export default App
