import React from 'react'
import dayjs from "dayjs"
import { useAuth } from '../context/authContext'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function Comment({comment}) {
    const {state: {currentUser}} = useAuth()
    const handleClick = e => {
        console.log("delete")
    }
    return (
        <div className="comment-card">
            <h3>{comment.creator.first_name}</h3>
            <p>{comment.body}</p>
            <small>{dayjs(comment.createdAt).fromNow()}</small>
            {/* <p>{currentUser.id}</p>
            <p>{comment.creator._id}</p> */}
            {currentUser.id === comment.creator._id ? (<button onClick={handleClick}>delete</button>): null}
        </div>
    )
}
