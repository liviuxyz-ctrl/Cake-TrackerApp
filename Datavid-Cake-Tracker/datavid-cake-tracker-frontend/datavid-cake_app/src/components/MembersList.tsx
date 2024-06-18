import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Member} from '../interfaces/Member';
import MemberItem from './MemberItem';
import './MembersList.scss'; // Import the CSS file

const MembersList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get<Member[]>('http://localhost:8000/api/members/sorted/');
                setMembers(response.data);
            } catch (err) {
                setError((err as any).message);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="members-list">
            <h2>All Members</h2>
            {error && <p className="error-message">Error: {error}</p>}
            <ul>
                {members.map(member => (
                    <MemberItem key={member.id} member={member}/>
                ))}
            </ul>
        </div>
    );
};

export default MembersList;
