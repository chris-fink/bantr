import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout'
import { collection, getDocs, doc } from "firebase/firestore";
import { fireDb } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import Post from '../components/Post';

function Share() {
    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem('batnr-user'));
    const dispatch = useDispatch();
    const getData = async () => {
        dispatch({ type: 'showLoading' });
        const result = await getDocs(doc(fireDb, 'users' , user.id));

        setData(result.data().shares);
        dispatch({ type: 'hideLoading' });
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <DefaultLayout>
            <div className='grid grid-cols-4 md:grid-cols-1 gap-10'>
                {data.map((post) => {
                    return (
                        <div className='card-sm'>
                            <Post post={Post} />
                            <h1 className='mt-2 text-gray-500 '>Shared by : {post.sharedBy.email}</h1>
                        </div>
                    )
                })}
            </div>
        </DefaultLayout>
    )
}

export default Share