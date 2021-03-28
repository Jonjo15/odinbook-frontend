import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/authContext'
import axios from "axios";
import {Redirect} from "react-router-dom"
import Post from "../components/post/Post"
import NewPostForm from '../components/post/NewPostForm';
import {Button} from "semantic-ui-react"

export default function Home() {
    const {state: {authenticated, token}} = useAuth()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = token;
        console.log(token)
        axios.get("http://localhost:5000/home").then(res => {
            setPosts(res.data.timelinePosts)
        }).catch(err => {
            setError(err.message)
        })
    }, [token])
    return authenticated ? (
        <div className="container">
            <h1 >Home Page</h1>
            {!showForm && <Button className="mb-50" icon="add" onClick={() => setShowForm(true)} />}
            {showForm && <NewPostForm setPosts={setPosts} setShowForm={setShowForm}/>}
            {posts.map(post => <Post key={post._id} post={post} setPosts={setPosts}/>)}
            {error && <p>{error}</p>}
        </div>
    ) : <Redirect to="/"/>
}
