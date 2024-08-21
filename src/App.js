import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import CreateWorkout from './components/CreateWorkout/CreateWorkout';
import CreateMeal from './components/CreateMeal/CreateMeal';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import UpdateProfileModal from './components/UpdateProfileModal/UpdateProfileModal';
import Dashboard from './components/Dashboard/Dashboard';
import WorkoutDetail from './components/WorkoutDetail/WorkoutDetail';
import MealDetail from './components/MealDetail/MealDetail';
import Timer from './components/Timer/Timer';
import './App.css';

function App() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile && userProfile.nombre) {
            setUserName(userProfile.nombre);
        }
    }, []);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <Router>
            <div className="app-container">
                <Navbar toggleSidebar={toggleSidebar} userName={userName} />
                <Sidebar openModal={openModal} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-workout" element={<CreateWorkout />} />
                        <Route path="/create-meal" element={<CreateMeal />} />
                        <Route path="/workouts/:id" element={<WorkoutDetail workouts={JSON.parse(localStorage.getItem('workouts')) || []} />} />
                        <Route path="/meals/:id" element={<MealDetail meals={JSON.parse(localStorage.getItem('meals')) || []} />} />
                        <Route path="/timer" element={<Timer />} />
                    </Routes>
                </div>
                <UpdateProfileModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </Router>
    );
}

export default App;
