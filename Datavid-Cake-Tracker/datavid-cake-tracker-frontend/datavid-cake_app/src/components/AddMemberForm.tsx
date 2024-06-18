import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Member } from '../interfaces/Member';

const AddMemberForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post<Member>('http://localhost:8000/api/members/', {
                first_name: firstName,
                last_name: lastName,
                birth_date: birthDate,
                country: country,
                city: city,
            });
            console.log('Member added:', response.data);
            setFirstName('');
            setLastName('');
            setBirthDate('');
            setCountry('');
            setCity('');
            toast.success('Member added successfully!');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorMsg = Object.values(err.response.data).flat().join(' ');
                toast.error(`Error: ${errorMsg}`);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <button type="submit">Add Member</button>
            </form>
        </>
    );
};

export default AddMemberForm;
