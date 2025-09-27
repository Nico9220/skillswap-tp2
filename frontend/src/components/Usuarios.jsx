"use client"; 
import { useEffect, useState } from 'react';

export default function Usuarios() {
    const [users, setUsers] = useState([]);
    
    useEffect(() =>{
        fetch('http://localhost:8000/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err));
    },[]);

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}