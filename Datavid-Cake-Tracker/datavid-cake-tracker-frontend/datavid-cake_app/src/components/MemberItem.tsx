// src/components/MemberItem.tsx
import '../styles/components/MemberItem.scss';

import React from 'react';
import { Member } from '../interfaces/Member';

interface MemberItemProps {
    member: Member;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    const daysUntilBirthday = member.days_until_birthday;

    return (
        <li className={`member-item ${getBirthdayClass(daysUntilBirthday)}`}>
            {member.first_name} {member.last_name} - {new Date(member.birth_date).toLocaleDateString()} - {daysUntilBirthday} days until birthday
        </li>
    );
};

const getBirthdayClass = (days: number): string => {
    if (days <= 7) return 'red';
    if (days <= 21) return 'orange';
    return 'green';
};

export default MemberItem;
