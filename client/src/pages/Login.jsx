import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../redux/state';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      })
      // Get data after fetching
      const loggedIn = await response.json();
      if(loggedIn) {
        dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      )
      navigate("/");
      }
    } catch(err) {
      console.log("Login Failed:", err.message);
    }
  };

  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flexCenter '>
      <div>
        <form onSubmit={handleSubmit} action="" className='flex flex-col gap-y-2.5 bg-white w-[366px] p-7 rounded-xl shadow-md text-[14px]'>
          <div className='flexCenter gap-x-2 mb-4'>
            <h3 className='h3 my-4'>Login</h3>
          </div>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" name='email' value={email} placeholder='Email Address' required className='bg-primary border-none p-2 pl-4 rounded-md outline-none' />
          <input onChange={(e)=>setPassword(e.target.value)} type="password" name='password' value={password} placeholder='Password' required className='bg-primary border-none p-2 pl-4 rounded-md outline-none' />
          <button type='submit' className='btn-secondary rounded mt-2'>Login</button>
          <div className='text-gray-30'> Don't have an account? <Link to={'/register'} className='text-secondary cursor-pointer pl-1'>Register</Link> </div>
        </form>
      </div>
    </div>
  )
}

export default Login