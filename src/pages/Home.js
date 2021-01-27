import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/authContext'
import axios from "axios";
import {Redirect} from "react-router-dom"
import Post from "../components/Post"


export default function Home() {
    const {state: {authenticated, currentUser, token}} = useAuth()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = token;
        axios.get("http://localhost:5000/home").then(res => {
            setPosts(res.data.timelinePosts)
        }).catch(err => {
            setError(err.message)
        })
    }, [token])
    return authenticated ? (
        <div>
            <h1>Home Page</h1>
            <p>.....{JSON.stringify(currentUser)}</p>
            <p>{JSON.stringify(token)}</p>
            {posts.map(post => <Post key={post._id} post={post} setPosts={setPosts}/>)}
            {error && <p>{error}</p>}
        </div>
    ) : <Redirect to="/"/>
}
