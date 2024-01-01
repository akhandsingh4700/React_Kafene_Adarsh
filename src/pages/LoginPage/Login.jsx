import React from 'react'
import { useState } from 'react'
import './Login.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import NavbarLogin from '../../Component/Navbar/NavbarLogin'
import { useSelector,useDispatch } from 'react-redux'
import { setLogin } from '../../Redux/action/loginaction'


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
 const [inputValue ,  setInputvalue] =  useState({
    email : '',
    password : '',
})

const handleInput = (e)=>{
    const {name , value} = e.target
    setInputvalue({...inputValue , [name] :  value})
}




const submitForm =async (e)=>{
    e.preventDefault();
    if (inputValue.email  !== inputValue.password || !inputValue.email|| !inputValue.password) {
        alert("Please enter valid credentials, Username and Pssword must be same");
        return;
      }

    const { data } = await axios.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login", {
        email: inputValue.email,
        password: inputValue.password,
      });

      if (data && data.email === "qaifi") {
        alert("Login Successful");
        navigate('/order')
        dispatch(setLogin(true))
        localStorage.setItem('loggedin',1)
        return;
      }
}



  return (
    <>
    <NavbarLogin/>
    <div id="form-wrapper">
    <form className="adminPage" id="form" >
        <h1>Sign In</h1>
        <input className="adminPage_InputField" type="text" name="email" value={inputValue.email} placeholder="Enter Username" onChange={handleInput} />
        <input className="adminPage_InputField" type="password" name="password" value={inputValue.password} placeholder="Enter Password" onChange={handleInput}/>
        <input className="adminPage_Button" type="submit" value="Login"  onClick={submitForm}/>
    </form>
</div>
    </>
   
  )
}

export default Login