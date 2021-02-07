import React, {useState} from 'react'
import axios from "axios"
import {useAuth} from "../../context/authContext"
import {Button, Modal, Form} from "semantic-ui-react"
function exampleReducer(state, action) {
    switch (action.type) {
      case 'close':
        return { open: false }
      case 'open':
        return { open: true, size: action.size }
      default:
        throw new Error('Unsupported action...')
    }
  }

export default function ProfilePicChange({token}) {
    axios.defaults.headers.common["Authorization"] = token
    const {updateUser} = useAuth()
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const [file, setFile] = useState("")
    const [error, setError] = useState("")
    const { open, size } = state
    const fileTypes = ["image/png", "image/jpeg"]

    const handleChange = e => {
        let file = e.target.files[0];
        if (file && fileTypes.includes(file.type)) {
            setFile(file)
            setError(null)
        }
        else {
            setFile("")
            setError("Choose the right file type (image/png or image/jpeg)")
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log("submit")
        if(!file) return
        //TODO: FINISH
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setError('something went wrong!');
        };
        // let formData = new FormData();
        // formData.append('file', file);
        // formData.append('upload_preset', "moxqjptj");
        // try {
            
        //     const response = await axios.post("https://api.cloudinary.com/v1_1/jonjo15/image/upload", formData)
        //     console.log(response)
        // } catch (error) {
        //     console.error(error)
        //     setError("Something went wrong")
        // }
        
    
        
    }
    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await axios.put("http://localhost:5000/users/profile_picture", {data: base64EncodedImage})
            console.log(res.data)
           //  console.log(res.data)
           //  const payload = {user: res.data.response}
            updateUser(res.data.user)
            setFile(null)
            dispatch({ type: 'close' })
            
         } catch (error) {
             setError(error.message)
             setFile(null)
             dispatch({ type: 'close' })
             
         }
    }
    return (
        <>
            <Button onClick={() => dispatch({ type: 'open', size: 'small' })}>
                Update Profile Image
            </Button>
            <Modal
                size={size}
                open={open}
                onClose={() => dispatch({ type: 'close' })}
            >
                <Modal.Header>Update Your Profile</Modal.Header>
                <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                    <label>Select new profile img</label>
                    <input type="file" onChange={handleChange} placeholder='New Img' />
                    {error && <p>{error}</p>}
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => dispatch({ type: 'close' })}>
                    Cancel
                </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}
