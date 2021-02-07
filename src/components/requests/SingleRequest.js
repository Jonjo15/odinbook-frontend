import React, {useState} from 'react'
import {Card, Button} from "semantic-ui-react"
import axios from "axios"
import { useAuth } from '../../context/authContext'
export default function SingleRequest({request, setRequests}) {
    const {updateUser, state: {token}} = useAuth()
    const [error, setError] = useState("")
    const handleAccept = async e => {
        e.target.disabled = true
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.post("http://localhost:5000/requests/" + request._id + "/accept")
            console.log(res.data)
            setRequests(prev => {
                return prev.filter(r => r._id !== request._id)
            })
            updateUser(res.data.updatedUser)
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }
    const handleReject = async e => {
        e.target.disabled = true
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.post("http://localhost:5000/requests/" + request._id + "/decline")
            console.log(res.data)
            setRequests(prev => {
                return prev.filter(r => r._id !== request._id)
            })
            updateUser(res.data.updatedUser)
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }
    return (
        error ? <p>{error}</p> : (<Card>
            <Card.Content>
                <Card.Header>{request.first_name + " " + request.family_name}</Card.Header>
                <Card.Description>
                {request.first_name} wants to become <strong>your friend</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button onClick={handleAccept} basic color='green'>
                    Approve
                </Button>
                <Button onClick={handleReject} basic color='red'>
                    Decline
                </Button>
                </div>
            </Card.Content>
        </Card> )
        
    )
}
