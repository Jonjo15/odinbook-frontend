import React from 'react'
import Comment from "./Comment"
import dayjs from "dayjs"
import { useAuth } from '../context/authContext'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function Post({post}) {
    const {state: {currentUser}} = useAuth()
    const handleClick = e => {
        console.log("delete")
    }
    return (
        <div className="post-card">
            <h2>{post.creator.first_name}</h2>
            <p>{post.body}</p>
            <small>{dayjs(post.createdAt).fromNow()}</small>
            {/* <p>{currentUser.id}</p>
            <p>{post.creator._id}</p> */}
            {currentUser.id === post.creator._id ? (<button onClick={handleClick}>delete</button>): null}
            {post.comments.map(com => <Comment key={com._id} comment={com}/>)}
        </div>
    )
}
