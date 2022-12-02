import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fireDb, app } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../components/Loader';
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';


function Login() {
    const {loading} = useSelector(store=>store);
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const login = () => {
        dispatch({type : 'showLoading'})
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                getDoc(doc(fireDb, 'users', user.uid)).then((user) => {
                    localStorage.setItem('bantr-user', JSON.stringify({ ...user.data(), id: user.id }))
                    toast.success('Login Successful');
                });
                dispatch({type : 'hideLoading'});
                navigate('/');
            })
            .catch((error) => {
                toast.error('Login Failed');
                dispatch({type : 'hideLoading'});
                console.log(error);
            });

    };
    useEffect(()=>{
        if(localStorage.getItem('bantr-user'))
        {
           navigate('/'); 
        }
    });
    
    return (
        <div className='h-screen flex justify-between flex-col bg-primary overflow-hidden'>

            {loading && <Loader/>}
            <div className='flex justify-start'>
                {/* Top Corner */}
                <div className='h-40 bg-secondary w-96 transform -skew-x-[25deg] -ml-10 flex items-center justify-center border-[#ffba08] border-8'>
                    <h1 id="logo" className='text-center text-6xl font-semibold skew-x-[25deg] text-white'>Bantr</h1>
                </div>
            </div>

            <div className='flex justify-center'>
                {/* Center Form */}
                <div className='w-[420px] flex flex-col space-y-5 card p-10 bg-neutral/75 rounded-xl border-[#ffba08] border-4'>
                    <h1 className='text-4xl text-black font-semibold'>Login</h1>
                    <hr />
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        className='border border-gray-400 h-10 rounded-sm focus:border-gray-500 pl-5' />

                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className='border border-gray-400 h-10 rounded-sm focus:border-gray-500 pl-5' />
                    <div className='flex justify-end'>
                        <button className='bg-primary h-10 text-white px-10 rounded-lg' onClick={login}>Login</button>
                    </div>
                    <hr />
                    <Link to='/register' className='text-[13px] text-black-50'>NOT YET REGISTERED? CLICK HERE TO REGISTER</Link>
                </div>
            </div>

            <div className='flex justify-end'>
                {/* Bottom Corner */}
                <div className='h-40 bg-secondary w-96 transform -skew-x-[25deg] -mr-10 flex items-center justify-center border-[#ffba08] border-8'>

                </div>
            </div>
        </div>
    )
}

export default Login;