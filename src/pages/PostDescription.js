import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { fireDb } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { TfiCommentAlt } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';

function PostDescription() {
  const currentUser = JSON.parse(localStorage.getItem('batnr-user'));
  const navigate = useNavigate();
  const getUserName = () => {
    const email = post.user.email;
    const userName = email.substring(0, email.length - 10)
    return userName;
  };

  const [post, setPost] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'showLoading' });
    getDoc(doc(fireDb, 'posts', params.id))
      .then((response) => {
        setPost({ ...response.data(), id: response.id });
        dispatch({ type: 'hideLoading' });
      })
      .catch(() => {
        dispatch({ type: 'hideLoading' });
      });
  }, []);

  const likeOrUnlikePost = () => {
    const likes = post.likes;
    
    likes.push({
      id : JSON.parse(localStorage.getItem('batnr-user'));
    })
  }

  return (
    <DefaultLayout>
      <div className='flex w-full justify-center'>
        {post && (
          <div
            onClick={() => navigate(`post/${post.id}`)}
            className='cursor-pointer h-[550px] w-[550px]'
          >
            <div className='flex item items-center card-sm p-2'>
              <div className='h-10 w-10 rounded-full bg-primary flex justify-center items-center text-white mr-2'>
                <span className='text-2xl '>
                  {getUserName()[0]}
                </span>
              </div>
              <span>{getUserName()}</span>
            </div>
            <div className='w-full text-center justify-center flex card-sm'>
              <img src={post.imageURL} alt='' className='h-full w-full' />
            </div>
            <div className='card-sm p-2 flex w-full items-center space-x-5'>
              <div className='flex space-x-2 items-center'>
                <AiOutlineHeart size={25} onClick={likeOrUnlikePost} />
                <h1>{post.likes.length}</h1>
              </div>
              <div className='flex space-x-2 items-center'>
                <TfiCommentAlt size={25} />
                <h1>{post.comment.length}</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}




export default PostDescription