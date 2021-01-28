import React from 'react'
import { useAuth } from '../context/authContext'

export default function UserPreview({user}) {
    const {state: {currentUser}} = useAuth()
    return (
        <div>
            <h1>{currentUser._id === user._id ? "You" : user._id}</h1>
        </div>
    )
}
