import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout'
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { fireDb } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Post from "../components/Post";


function Profile() {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const params = useParams();
    const getUserName = (text) => {
        const email = text;
        const userName = email.substring(0, email.length - 10)
        return userName;
    };

    const getPosts = async () => {
        dispatch({ type: 'showLoading' });
        const querySnapshot = await getDocs(collection(fireDb, "posts"));
        const temp = [];
        querySnapshot.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id });
        });
        const filterPost = temp.filter((post) => post.user.id === params.id);
        console.log(filterPost);
        setPosts(filterPost);
        dispatch({ type: 'hideLoading' });
    };
    const getUser = async () => {
        const result = await getDoc(doc(fireDb, 'users', params.id));
        setUser(result.data());
    }
    useEffect(() => {
        getPosts();
        getUser();
    }, []);

    return (
        <DefaultLayout>
            {user && (
                <>
                    {' '}
                    <div className='cursor-pointer h-[550px] w-[550px]'>
                        <div className='flex item items-center card-sm p-2'>
                            <div className='h-24 w-24 rounded-full bg-primary flex justify-center items-center text-white mr-2'>
                                <span className='text-7xl '>
                                    {getUserName(user.email)[0]}
                                </span>
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <span>{getUserName(user.email)}</span>
                                <span>{user.email}</span>
                                <hr />
                                <span>{user.bio}</span>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <div className='card-sm p-2'>
                            <h1>Posts uploaded by: {getUserName(user.email)} </h1>
                        </div>
                        <div className='grid grid-cols-4 md:grid-cols-1 gap-10 mt-5'>
                            {posts.map((post) => {
                                return <Post post={Post} />
                            })}
                        </div>
                    </div>
                </>
            )}
        </DefaultLayout>
    );
}

export default Profile