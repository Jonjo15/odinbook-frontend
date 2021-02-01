import React, {useState, useEffect} from 'react'
import {Dropdown} from "semantic-ui-react"
import {Link} from "react-router-dom"
import SingleRequest from "./SingleRequest"
import axios from "axios"
import { useAuth } from '../context/authContext'

export default function Requests() {
    const {state: {token, currentUser}} = useAuth()
    const [requests, setRequests] = useState([])
    const [error, setError] = useState("")
    axios.defaults.headers.common["Authorization"] = token;
    useEffect(() => {
        if (currentUser.friendRequests.length === 0) {
            return
        }
        axios.get("http//localhost:5000/requests/me").then(res => {
            // TODO: WRITE THIS ROUTE
            console.log(res.data)
            setRequests(res.data.requests)
        }).catch(e => {
            setError("Something went wrong with getting friend requests")
        })
    }, [currentUser.friendRequests.length])
    return (
        <div>
            <Dropdown text={(requests.length).toString()} icon="alarm">
                <Dropdown.Menu>
                    {requests.map(r => <Dropdown.Item key={r._id} as={SingleRequest} request={r}/>)}
                    {requests.length === 0 && <Dropdown.Item text="You have no friend Requests"/>}
                    {requests.length < 10 && <Dropdown.Item text="View all friend requests" as={Link} to="/requests"/>}
                </Dropdown.Menu>
            </Dropdown>
            {/* {requests.map(n => <a href="#" key={n._id}>{n._id}</a>)} */}
            {error && <span>{error}</span>}
        </div>
    )
}
