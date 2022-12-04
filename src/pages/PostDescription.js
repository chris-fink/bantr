import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { fireDb } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { TfiCommentAlt } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostDescription() {
  const currentUser = JSON.parse(localStorage.getItem('batnr-user'));
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const navigate = useNavigate();
  const getUserName = (text) => {
    const email = text;
    const userName = email.substring(0, email.length - 10)
    return userName;
  };

  const [post, setPost] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getData = () => {
    dispatch({ type: 'showLoading' });
    getDoc(doc(fireDb, 'posts', params.id))
      .then((response) => {
        setPost({ ...response.data(), id: response.id });
        dispatch({ type: 'hideLoading' });
      })
      .catch(() => {
        dispatch({ type: 'hideLoading' });
      });
  }

  useEffect(() => {
    getData()
  }, []);

  const likeOrUnlikePost = () => {
    let updatedLikes = post.likes;

    if (alreadyLiked) {
      updatedLikes = post.likes.filter((user) => user.id !== currentUser.id);
    } else {
      updatedLikes.push({
        id: currentUser.id,
        email: currentUser.email
      });
    };

    setDoc(document(fireDb, 'post', post.id), { ...post, like: updatedLikes })
      .then(() => {
        getData();
        toast.success('Post liked successfully')
      }).catch(() => {
        toast.error('An error occurred')
      })
  }

  return (
    <DefaultLayout>
      <div className='flex w-full justify-center space-x-5'>
        {post && (
          <>

            {/*Like display purpose */}
            {showLikes && (
              <div className='w-96'>
                <h1>Liked By</h1>
                <hr />
                {post.likes.map((like) => {
                  return <div className='flex item items-center card-sm p-2'>
                    <div className='h-10 w-10 rounded-full bg-primary flex justify-center items-center text-white mr-2'>
                      <span className='text-2xl '>
                        {getUserName(like.email)[0]}
                      </span>
                    </div>
                    <span>{getUserName(like.email)}</span>
                  </div>
                })}
              </div>
            )}

            {/*post info purpose */}
            <div
              className='cursor-pointer h-[550px] w-[550px]'
            >
              <div className='flex item items-center card-sm p-2'>
                <div className='h-10 w-10 rounded-full bg-primary flex justify-center items-center text-white mr-2'>
                  <span className='text-2xl '>
                    {getUserName(post.user.email)[0]}
                  </span>
                </div>
                <span>{getUserName(post.user.email)}</span>
              </div>
              <div className='w-full text-center justify-center flex card-sm'>
                <img src={post.imageURL} alt='' className='h-full w-full' />
              </div>
              <div className='card-sm p-2 flex w-full items-center space-x-5'>
                <div className='flex space-x-2 items-center'>
                  <AiOutlineHeart size={25} onClick={likeOrUnlikePost} />
                  <h1
                    className='underline font-semibold cursor-pointer'
                    onClick={() => setShowLikes(true)}
                  >
                    {post.likes.length}
                  </h1>
                </div>
                <div className='flex space-x-2 items-center'>
                  <TfiCommentAlt size={25} />
                  <h1>{post.comment.length}</h1>
                </div>
              </div>
            </div>

            {/*comments info purpose */}
            <div>

            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
}




export default PostDescription