import React, { useState, useRef } from 'react'
import './RegisterComponent.css'
import { Room, Cancel } from "@material-ui/icons"
import axios from "axios"

const RegisterComponent = (props) => {
    const { setShowRegister } = props;

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            await axios.post("/users/register", newUser);
            setError(false);
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
            setError(true);
        }
    }

    return (
        <div className="registerContainer">
            <div className="logo">
                <Room></Room>
                Travelix
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={nameRef} required></input>
                <input type="email" placeholder="Email" ref={emailRef} required></input>
                <input type="password" placeholder="Password" ref={passwordRef} required></input>
                <button className='registerBtn'>Register</button>
                {success && <span className="success">Registered! You can login now.</span>}
                {error && <span className="failure">Are you sure your email is valid? Username/Email might be taken. Sorry :(</span>}
            </form>
            <Cancel onClick={() => setShowRegister(false)} className="registerCancel" />
        </div>
    )
}

export default RegisterComponent
