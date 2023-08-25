import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Import useAuth
import Brands from './views/screens/brands';
import Projects from './views/screens/projects';
import Workflows from './views/screens/workflows';
import Dialogs from './views/screens/dialogs';
import Layout from './views/screens/layout';
import Admin from './views/screens/admin';
import AdminLogin from './views/screens/adminLogin';
import Login from './views/screens/login';
import Signup from './views/screens/signup';
import ForgotPassword from './views/screens/forgot';
import ResetPassword from './views/screens/reset';

const App = () => {

  const AdminRoute = ({ element }) => {
    const user = sessionStorage.getItem('super_admin');
    if (!user) {
      return <Navigate to="/admin/login" />;
    }
    return element;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout mainComponent={<Brands />} />}/>
        <Route path="/projects" element={<Layout mainComponent={<Projects />} />} />
        <Route path="/workflows" element={<Layout mainComponent={<Workflows />} />} />
        <Route path="/dialogs" element={<Layout mainComponent={<Dialogs />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forget_password' element = {<ForgotPassword />} />
        <Route path='/reset/:id' element={<ResetPassword />} />
        <Route path="/admin" element={<AdminRoute element={<Admin />} />} ></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
