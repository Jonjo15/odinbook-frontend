import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext'


export default function Users() {
    const {state: {token}} = useAuth()
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = token;
        axios.get("http://localhost:5000/users/")
        .then(res => {
            setUsers(res.data.users)
        })
        .catch(err => {
            setError(err.message)
        })
    },[token])
    //TODO:
    return (
        <div>
            <h1>Users</h1>
            {error && <small>{error}</small>}
            {users && users.map(u => <h1>{u._id}</h1>)}
        </div>
    )
}
