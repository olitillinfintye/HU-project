import './App.css';
import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminLogin from './admin/scenes/AdminLogin';
import AdminDashboard from "./admin/scenes/AdminDash";
import AdminBanApprove from "./admin/scenes/AdminBA";
import AdminDelete from "./admin/scenes/AdminDP";
import AdminCategory from "./admin/scenes/AdminAC"
import AdminAddsd from "./admin/scenes/AdminSD";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {


  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path="/about" exact element={<About/>} />
            <Route path="/login" exact element={<Login/>} /> 
            <Route path="/forgot" exact element={<Forgot/>} />
            <Route path="/reset" exact element={<Reset/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/dashboard" exact element={<Dashboard/>} />
            <Route path="/profile" exact element={<Profile/>} />
            <Route path="/chat" exact element={<Chat/>} />
            <Route path="/admin" exact element={<AdminDashboard/>} />
            <Route path="/admin/login" exact element={<AdminLogin/>} />
            <Route path="/admin/delete" exact element={<AdminDelete/>} />
            <Route path="/admin/banapprove" exact element={<AdminBanApprove/>} />
            <Route path="/admin/addsd" exact element={<AdminAddsd/>} />
            <Route path="/admin/category" exact element={<AdminCategory/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
