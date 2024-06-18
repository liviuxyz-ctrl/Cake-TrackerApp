// src/components/MemberItem.tsx
import '../styles/components/MemberItem.scss';

import React from 'react';
import { Member } from '../interfaces/Member';

interface MemberItemProps {
    member: Member;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    const daysUntilBirthday = calculateDaysUntilBirthday(new Date(member.birth_date));

    return (
        <li className={`member-item ${getBirthdayClass(daysUntilBirthday)}`}>
            {member.first_name} {member.last_name} - {new Date(member.birth_date).toLocaleDateString()} - {daysUntilBirthday} days until birthday
        </li>
    );
};

const calculateDaysUntilBirthday = (birthDate: Date): number => {
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = Math.abs(nextBirthday.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

const getBirthdayClass = (days: number): string => {
    if (days <= 7) return 'red';
    if (days <= 21) return 'orange';
    return 'green';
};

export default MemberItem;
