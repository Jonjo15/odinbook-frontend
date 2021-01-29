import React from 'react'
import { useAuth } from '../context/authContext'

export default function Profile() {
    const {state: {currentUser}} = useAuth()
    return (
        <div className="container">
            <h1>Your Profile</h1>
            <h3>Full Name: {currentUser.first_name} {currentUser.family_name}</h3>
            <div className="bio">
                {/* TODO: */}
            </div>
        </div>
    )
}
