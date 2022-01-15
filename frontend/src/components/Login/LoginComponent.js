import React, { useState, useRef } from 'react'
import './LoginComponent.css'
import { Room, Cancel } from "@material-ui/icons"
import axios from "axios"

const LoginComponent = (props) => {
    const { setShowLogin, myStorage, setCurrentUser, setShowTutorial } = props;
    const [error, setError] = useState(null)
    const nameRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const res = await axios.post("/users/login", user);
            myStorage.setItem("user", res.data.username)
            setCurrentUser(res.data.username)
            setError(null);
            setShowTutorial(true)
            setShowLogin(false);
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="loginContainer">
            <div className="logo">
                <Room></Room>
                Travelix
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef} required></input>
                <input type="password" placeholder="Password" ref={passwordRef} required></input>
                <button className='loginBtn'>Login</button>
                {error &&
                    (<div>
                        <h4 className="failure">Credentials invalid. Have you registered yet?</h4>
                    </div>)}
            </form>
            <Cancel onClick={() => setShowLogin(false)} className="registerCancel" />
        </div>
    )
}

export default LoginComponent
