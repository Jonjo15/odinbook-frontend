import React, {useState} from 'react'
import Comment from "./Comment"
import dayjs from "dayjs"
import { useAuth } from '../context/authContext'
import axios from "axios"
import NewCommentForm from './NewCommentForm'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function Post({post, setPosts}) {
    const {state: {currentUser, token}} = useAuth()
    const [showForm, setShowForm] = useState(false)
    const handleClick = async e => {
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.delete("http://localhost:5000/users/posts/" + post._id)
            console.log(res.data)
            setPosts(prevPosts => {
                return prevPosts.filter(p => p._id !== post._id)
            })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="post-card">
            <h2>{post.creator.first_name}</h2>
            <p>{post.body}</p>
            <small>{dayjs(post.createdAt).fromNow()}</small>
            {/* <p>{currentUser.id}</p>
            <p>{post.creator._id}</p> */}
            {!setShowForm && <button onClick={() => setShowForm(true)}>Add a comment</button>}
            {showForm && <NewCommentForm setPosts={setPosts} setShowForm={setShowForm} postId={post._id}/>}
            {currentUser._id === post.creator._id ? (<button onClick={handleClick}>delete</button>): null}
            {post.comments.map(com => <Comment key={com._id} comment={com} setPosts={setPosts}/>)}
        </div>
    )
}
