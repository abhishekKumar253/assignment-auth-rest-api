"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Loginpage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        loginInput: "", 
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const onLogin = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const { loginInput, password } = user;
        if (loginInput.trim() !== "" && password.trim() !== "") {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />

                <label htmlFor='loginInput'>Enter username or email</label>
                <input
                    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                    type="text"
                    id='loginInput'
                    value={user.loginInput}
                    onChange={(e) => setUser({...user, loginInput: e.target.value})}
                    placeholder='Enter username or email'
                />

                <label htmlFor='password'>Password</label>
                <input
                    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                    id='password'
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder='Enter password'
                />

                <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' disabled={loading || !user.loginInput || !user.password}>
                    {buttonDisabled ? "No Login" : "Login"}
                </button>

            <Link href="/signup">Visit Signup page</Link>
        </div>
    );
}

export default Loginpage;





