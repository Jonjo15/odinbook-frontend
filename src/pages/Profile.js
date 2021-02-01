import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import {Card, Icon, Button} from "semantic-ui-react"

export default function Profile() {
    const {state: {currentUser}} = useAuth()
    const [showForm, setShowForm] = useState(false)
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
            {!showForm && <Button content="Change bio" onClick={() => setShowForm(true)}/>}
        </div>
        
    )
}
