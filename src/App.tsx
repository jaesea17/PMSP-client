import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import { PrivateRoutes } from './utils/PrivateRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateStation from './pages/admin/CreateStation';
import UpdateProduct from './pages/admin/UpdateProduct';
import AdminLogin from './pages/admin/adminLogin';
import AdminHome from './pages/admin/AdminHome';


function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/" element={<AdminHome />} />
      <Route element={<PrivateRoutes />}>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="/admin/create-station" element={<CreateStation />} />
        <Route path="update-product" element={<UpdateProduct />} />
      </Route>
    </Routes>
  )
}

export default App
