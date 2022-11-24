import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireDb , app} from "../firebaseConfig";
import { addDoc, collection } from 'firebase/firestore';



function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {

      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email : user.email ,
            profilePicUrl : '' ,
            bio : '' ,
          }
          addDoc(collection(fireDb, 'users'), userData);
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className='h-screen flex justify-between flex-col bg-primary overflow-hidden'>

        <div className='flex justify-start'>
          {/* Top Corner */}
          <div className='h-40 bg-secondary w-96 transform -skew-x-[25deg] -ml-10 flex items-center justify-center border-yellow-400 border-8'>
            <h1 id="logo" className='text-center text-6xl font-semibold skew-x-[25deg] text-white'>Bantr</h1>
          </div>
        </div>

        <div className='flex justify-center'>
          {/* Center Form */}
          <div className='w-[420px] flex flex-col space-y-5 card p-10 bg-neutral/75 rounded-xl border-yellow-400 border-4'>
            <h1 className='text-4xl text-black font-semibold'>Register</h1>
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

            <input type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              className='border border-gray-400 h-10 rounded-sm focus:border-gray-500 pl-5' />
            <div className='flex justify-end'>
              <button className='bg-primary h-10 text-white px-10 rounded-lg' onClick={register}>Register</button>
            </div>
            <hr />
            <Link to='/login' className='text-sm text-black-50'>ALREADY REGISTERED? CLICK HERE TO LOGIN</Link>
          </div>
        </div>

        <div className='flex justify-end'>
          {/* Bottom Corner */}
          <div className='h-40 bg-secondary w-96 transform -skew-x-[25deg] -mr-10 flex items-center justify-center border-yellow-400 border-8'>

          </div>
        </div>
      </div>
    )
  };

  export default Register;