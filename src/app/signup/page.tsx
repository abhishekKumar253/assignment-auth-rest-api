"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';

const Signuppage = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/signup", user);
            console.log("Signup success", response.data);
            router.push("/login")                    
        } catch (error: any) {
            console.log("Signup failed");
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(
            user.fullName.length > 0 &&
            user.username.length > 0 &&
            user.email.length > 0 && 
            user.password.length > 0
        ){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="fullName">fullName</label>

      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-black' type="text" id="fullName" placeholder='Enter fullName' value={user.fullName} onChange={(e) => setUser({...user, fullName: e.target.value})}/>
      <label htmlFor="username">username</label>

      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-black' type="text" id="username" placeholder='Enter username' value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}/>

      <label htmlFor="email">email</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-black' type="email" id="email" placeholder='Enter email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>

      <label htmlFor="password">password</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-black' type="password" id="password" placeholder='Enter password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>

      <button onClick={onSignup} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No Signup" : "Signup"}</button>
      <Link href="/login">Visit login Page</Link>
    </div>
  )
}

export default Signuppage
