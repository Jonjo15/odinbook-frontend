import React from 'react'
import { useAuth } from '../context/authContext'
import {Card, Icon} from "semantic-ui-react"
import BioUpdateForm from "../components/BioUpdateForm"
export default function Profile() {
    const {state: {currentUser, token}} = useAuth()
    //TODO: IMPLEMENT POP UP FORM FOR BIO UPDATE
    const extra = (
        // eslint-disable-next-line
        <a href="#">
          <Icon name='user' />
          {currentUser.friends.length}
        </a>
      )
    return (
        <div className="container">
            <Card
            image={currentUser.profile_pic_url ? currentUser.profile_pic_url : null}
            header={currentUser.first_name + " " + currentUser.family_name}
            meta={currentUser.email}
            description={currentUser.bio ? currentUser.bio : "Update bio"}
            extra={extra}
            />
            <BioUpdateForm token={token} />
        </div>
        
    )
}
