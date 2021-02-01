import React from 'react'
import { useAuth } from '../context/authContext'

export default function FriendRequests() {
    const {state: {currentUser}} = useAuth()
    return (
        <div className="container">
            <h1>Friend requests page</h1>
            {currentUser.friendRequests.length === 0 ? <p>You have no friend requests</p> : (currentUser.friendRequests.map(fr => <p>{fr}</p>))}
            
        </div>
    )
}
