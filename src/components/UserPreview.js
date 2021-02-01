import React, {useState} from 'react'
import { useAuth } from '../context/authContext'
import axios from "axios"
import {Link} from "react-router-dom"
import {Button} from "semantic-ui-react"
export default function UserPreview({user, setUsers}) {
    const {updateUser, state: {currentUser, token, loading}} = useAuth()
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
    const handleAccept = async e => {
        e.target.disabled = true
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.post("http://localhost:5000/requests/" + user._id + "/accept")
            setUsers(prevUsers => {
                return prevUsers.map(u => {
                    if (u._id !== user._id) {
                        return u
                    }
                    else {
                        return res.data.updAcceptedUser
                    }
                })
            }) 
            updateUser(res.data.updatedUser)
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }
    const handleDecline = async e => {
        e.target.disabled = true
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.post("http://localhost:5000/requests/" + user._id + "/decline")
            updateUser(res.data.updatedUser)
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }

    // console.log("c.u.", currentUser)
    // console.log("u", user)
    const friendStatusMarkup = currentUser._id === user._id ? null
     :
      currentUser.friendRequests.includes(user._id) ? (<><Button basic color="green" content="Accept" onClick={handleAccept}/><Button basic color="red" content="Decline" onClick={handleDecline} /></>) : currentUser.friends.includes(user._id)
        ? 
     (<p>Friend</p>)
      :
      user.friendRequests.includes(currentUser._id) ? (<Button content="Sent" disabled/>) 
        :
       (<Button content="Send a friend request" onClick={handleRequest}/>)
    return (
        loading ? <h1>Loading...</h1> :
        <div className="preview-card">
            {error && <small>{error}</small>}
            <Link to={"/users/"+ user._id}><h6>{currentUser._id === user._id ? "You" : (user.first_name + " " + user.family_name)}</h6></Link>
            {friendStatusMarkup}
        </div>
    )
}
