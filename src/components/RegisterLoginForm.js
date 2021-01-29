import React, {useState} from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useAuth } from '../context/authContext'

export default function RegisterLoginForm() {
    const {login, register, fbSignIn, state: {error}} = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    // const [error, setError] = useState(null)
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const responseFacebook = async(response) => {
        console.log(response.accessToken)
        try {
            await fbSignIn({access_token: response.accessToken})
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (isLogin) {
            const obj ={
                email,
                password
            }
            try {
                await login(obj)

            } catch (err) {
                console.error(err)
            }
        }
        else {
            const obj = {
                email,
                password,
                first_name: firstName,
                family_name: familyName
            }
            try {
                await register(obj)
            }
            catch(err) {
                console.error(err)
            }
        }
    }
    return (
        <div className="form-container">
            <form className="reg-log-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Email: </label>
                <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="text" value={email}/>
                <label htmlFor="title">Password: </label>
                <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" value={password}/>
                {!isLogin && (<>
                <label htmlFor="title">First Name: </label>
                <input onChange={(e) => setFirstName(e.target.value)} id="firstName" name="firstName" type="text" value={firstName}/>
                <label htmlFor="title">Family Name: </label>
                <input onChange={(e) => setFamilyName(e.target.value)} id="familyName" name="familyName" type="text" value={familyName}/>
                </>) }
                <button type="submit">{isLogin ? "Log In": "Register"}</button>
            </form> 
            <small>{isLogin ? "Don't have an account?" : "Already have an account?"}</small>
            <button onClick={() => setIsLogin(prevLogin => !prevLogin)}>{isLogin ? "Register here" : "Login here"}</button>
            <br/>
                <FacebookLogin
                    appId="130214035599288"
                    callback={responseFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>Sign in with Facebook</button>
                    )}
                />
            {error && <small>{error}</small>}
        </div>
    )
}
