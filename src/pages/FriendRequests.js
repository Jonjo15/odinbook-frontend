import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext'
import SingleRequest from "../components/SingleRequest"

export default function FriendRequests() {
    const {state: {currentUser, token}} = useAuth()
    const [requests, setRequests] = useState([])
    const [error, setError] = useState("")
    axios.defaults.headers.common["Authorization"] = token;
    useEffect(() => {
        if (currentUser.friendRequests.length === 0) {
            return
        }
        axios.get("http://localhost:5000/requests/").then(res => {
            // TODO: WRITE THIS ROUTE
            console.log(res.data)
            setRequests(res.data.requests)
        }).catch(e => {
            setError("Something went wrong with getting friend requests")
        })
    }, [currentUser.friendRequests.length, currentUser])
    return (
        <div className="container">
            <h1>Friend requests page</h1>
            {currentUser.friendRequests.length === 0 ? <p>You have no friend requests</p> : (requests.map(fr => <SingleRequest setRequests={setRequests} request={fr} key={fr._id}/>))}
            {error && <p>{error}</p>}
        </div>
    )
}
