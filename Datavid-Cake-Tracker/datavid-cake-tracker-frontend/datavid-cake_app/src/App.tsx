import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface Member {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: string;
}

const App: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        axios.get('/api/members/sorted/')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the members!', error);
            });
    }, []);

    return (
        <div>
            <h1>Members List</h1>
            <ul>
                {members.map((member) => (
                    <li key={member.id}>
                        {member.first_name} {member.last_name} - {member.birth_date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
