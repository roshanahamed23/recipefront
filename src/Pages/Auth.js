import React,{useState}from 'react'
import axios from "axios";
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

const Auth = () => {
  return (
    <div>
      <Login/>
      <Register/>
    </div>
  )
}

const Register = ()=>{
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const [_,setCookies]=useCookies(["access_token"]);
  
  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post("http://localhost:4000/auth/register",{username,password});
      alert(response.data.message)
    }catch(error){
      console.log(error);
    }
  }
  return(
    <Form 
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    Title="Register"
    onsubmit={handlesubmit}
    />
  );

}
const Login = ()=>{
  const navigate=useNavigate();
  const [_,setCookies]=useCookies(["access_token"]);

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const handlesubmit= async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post("http://localhost:4000/auth/login",{username,password});
      setCookies("access_token",response.data.token);
      window.localStorage.setItem("userID",response.data.userId);
      navigate('/');
    }catch(error){
      console.log(error);
    }
  }
  return(
    <Form 
    username={username}
    setUsername={setUsername}
    password={password}
    setPassword={setPassword}
    Title="Login"
    onsubmit={handlesubmit}
    />
  );

}


const Form =({username,setUsername,password,setPassword,Title,onsubmit})=>{
  return(
    <div className='auth-container'>
      <h2>{Title}</h2>
      <form onSubmit={onsubmit} >
      <div className="form-group">
        <label htmlFor='username'>username:</label>
        <input 
        type='text' 
        placeholder='enter the username' 
        id="username" 
        value={username}
        onChange={(e)=>{setUsername(e.target.value)}}
        />
      </div>
      <div className="form-group">
        <label htmlFor='password'>password:</label>
        <input type='password' placeholder='password' id="password" value={password}
        onChange={(e)=>{setPassword(e.target.value)}}/>
      </div>
      <button type="submit">{Title}</button>
      </form>
    </div>
  );
}

export default Auth;