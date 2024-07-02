// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddMemberForm from './components/AddMemberForm';
import MembersList from './components/MembersList';
import axios from 'axios';
import { Member } from './interfaces/Member';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'; // Import the CSS filefile

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const addMember = async (newMember: Member) => {
        try {
            const response = await axios.post<Member>('http://localhost:8000/api/members/', newMember);
            console.log('Member added:', response.data);
        } catch (err) {
            const errorMessage = (err as any).response?.data?.detail || 'An error occurred';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <h1>Datavid Cake Tracker</h1>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/edit-member">Edit Member</Link></li>
                            <li><Link to="/calendar">Calendar</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><Link to="/temp">Temp Menu</Link></li>
                        </ul>
                    </nav>
                </header>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <AddMemberForm onAddMember={addMember} error={error} />
                                <MembersList />
                            </>
                        } />
                        <Route path="/edit-member" element={<div>Edit Member Page</div>} />
                        <Route path="/calendar" element={<div>Calendar Page</div>} />
                        {/*<Route path="/settings" element={<div>Settings Page</div>} />*/}
                        {/*<Route path="/temp" element={*/}
                        {/*    <>*/}
                        {/*        <AddMemberForm onAddMember={addMember} error={error} />*/}
                        {/*        <MembersList />*/}
                        {/*    </>*/}
                        {/*} />*/}
                    </Routes>
                </main>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
