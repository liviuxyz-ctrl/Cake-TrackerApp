import React from 'react';
import { Member } from '../interfaces/Member';
import './MemberItem.scss';

interface MemberItemProps {
    member: Member;
}

const MemberItem: React.FC<MemberItemProps> = ({ member }) => {
    return (
        <li className="member-item">
            {member.first_name} {member.last_name} - {new Date(member.birth_date).toLocaleDateString()}
        </li>
    );
};

export default MemberItem;
