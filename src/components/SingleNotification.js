import React from 'react'
import {Feed, Button} from "semantic-ui-react"
import {Link} from "react-router-dom"
import dayjs from "dayjs"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function SingleNotification({notification}) {
    let likeContent;
    let route;
    let icon = notification.type === "comment" ? "pencil" : notification.type === "like" ? "like" : "handshake"
    if (notification.commentId) {
        route = "/posts/" + notification.commentId.post
    }
    else if (notification.type === "accept") {
        route = "/users/" + notification.sender._id
    }
    else {
        route = "/posts/" + notification.postId
    }
    if (notification.postId) {
        likeContent = "post"
    }
    else {
        likeContent = "comment"
    }
    const content = notification.type === "comment"
     ?
      (notification.sender.first_name + " commented on your post") 
      : 
      notification.type ==="accept" ? 
      (notification.sender.first_name + " accepted your request") : (notification.sender.first_name+" liked your " +likeContent)
    return (
        <div>
        <Feed className="padding">
            <Feed.Event as={Link} to={route}
            content={content}
            date={dayjs(notification.createdAt).fromNow()}
            icon={icon}
            />
        </Feed>
        {/* <Button content="mark seen"/> */}
        </div>
    )
}
