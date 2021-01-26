import React, {useState} from 'react'
import FacebookLogin from 'react-facebook-login';

export default function RegisterLoginForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const responseFacebook = (response) => {
        console.log(response)
    }
    return (
        <div>
            <form>
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
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook} />
        </div>
    )
}
