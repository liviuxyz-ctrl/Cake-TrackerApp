import React, {useState} from 'react';
import AddMemberForm from './components/AddMemberForm';
import MembersList from './components/MembersList';
import axios from 'axios';
import {Member} from './interfaces/Member';
import './App.scss'; // Import the CSS file

const App: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const addMember = async (newMember: Member) => {
        try {
            const response = await axios.post<Member>('http://localhost:8000/api/members/', newMember);
            console.log('Member added:', response.data);
        } catch (err) {
            setError((err as any).message);
        }
    };

    return (
        <div className="app-container">
            <h1>Datavid Cake Tracker</h1>
            <AddMemberForm onAddMember={addMember} error={error}/>
            <MembersList/>
        </div>
    );
};

export default App;
