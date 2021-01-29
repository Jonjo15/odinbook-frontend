import React, {useState} from 'react'
import { useAuth } from '../context/authContext'
import axios from "axios"

export default function UserPreview({user, setUsers}) {
    const {state: {currentUser, token}} = useAuth()
    const [error, setError] = useState(null)
    const handleRequest = async e => {
        e.target.disabled = true;
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.post("http://localhost:5000/requests/" + user._id)
            console.log(res.data)
            setUsers(prevUsers => {
                return prevUsers.map(u => {
                    if(u._id !== user._id) {
                        return u
                    }
                    else {
                        return res.data.updatedRecipient
                    }
                })
            })
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }
    const friendStatusMarkup = currentUser._id === user._id ? null : currentUser.friends.includes(user._Id)
        ? 
     (<p>Friend</p>)
      :
      user.friendRequests.includes(currentUser._id) ? (<button disabled>Sent</button>) 
        :
       (<button onClick={handleRequest}>Send a friend request</button>)
    return (
        <div className="preview-card">
            {error && <small>{error}</small>}
            <h6>{currentUser._id === user._id ? "You" : (user.first_name + " " + user.family_name)}</h6>
            {friendStatusMarkup}
        </div>
    )
}
