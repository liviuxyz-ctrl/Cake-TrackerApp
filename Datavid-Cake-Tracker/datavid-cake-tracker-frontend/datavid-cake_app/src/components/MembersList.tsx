// src/components/MembersList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Member } from '../interfaces/Member';
import MemberItem from './MemberItem';

const MembersList: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get<Member[]>('http://localhost:8000/api/members/sorted/');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const sortedMembers = [...members].sort((a, b) => a.days_until_birthday - b.days_until_birthday);

    return (
        <div>
            <h2>Ordered list with birthdays:</h2>
            <ul>
                {sortedMembers.map((member) => (
                    <MemberItem key={member.id} member={member} />
                ))}
            </ul>
        </div>
    );
};

export default MembersList;
