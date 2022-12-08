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
        <DefaultLayout>Profile</DefaultLayout>
    )
}

export default Profile