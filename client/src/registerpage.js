import {  useEffect, useState, } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

const UserRegister = () => {
    const [Name, setName]=useState('')
    const [Username, setUsername]=useState('')
    const [Password, setPassword]= useState('')
    const [message, setMessage]=useState('')
    const [msgtyp, setMsgtyp]=useState('')

    const handleRegister = (e)=> {
        e.preventDefault()
        const data = {name: Name, username: Username, password: Password}
        axios.post('http://localhost:5000/register',data).then((res)=>{
        const {data} = res
        setMessage(data.message)
        setMsgtyp(data.msg_type)
    }).catch((err)=>console.log(err))   
}

    return ( 
        <div className="container">
        <h1>User Login</h1>

        <form onSubmit={handleRegister}>
            <div className="data">
                <label htmlFor="name">Name</label>
                <input type="text" id='name' required onChange={(event) => {
                                    setName(event.target.value)
                                }}></input>
            </div>
            <div className="data">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' required onChange={(event) => {
                                    setUsername(event.target.value)
                                }}></input>
            </div>
            <div className="data">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' required onChange={(event) => {
                                    setPassword(event.target.value)
                                }}></input>
            </div>
            <div className="btn">
                <button type="submit">Register</button>
            </div>
        </form>
        <div className={msgtyp} >{message} </div>
        <div className="signup-link">
            Already a Member? <Link to="/login">Login</Link>
        </div>
    </div>
     );
}
 
export default UserRegister;