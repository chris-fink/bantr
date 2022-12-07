import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { fireDb } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { TfiCommentAlt } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mockComponent } from 'react-dom/test-utils';
import { FiShare } from 'react-icons/fi';

function PostDescription() {
  const currentUser = JSON.parse(localStorage.getItem('batnr-user'));
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [alreadyCommented] = useState(false);
  const [commentText, setCommentText] = useState('');
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
        if (response.data().likes.find((user) => user.id === currentUser.id)) {
          setAlreadyLiked(true);
        } else {
          setAlreadyLiked(false);
        }
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
      });
  }

  const addComment = () => {
    let updatedComments = post.comments;

    if (alreadyCommented) {
      updatedComments = post.likes.filter((user) => user.id !== currentUser.id);
    } else {
      updatedComments.push({
        id: currentUser.id,
        email: currentUser.email,
        commentText,
        createdOn: mockComponent().format('DD-MM-YYYY')
      });
    };

    setDoc(document(fireDb, 'post', post.id), { ...post, comments: updatedComments })
      .then(() => {
        getData();
        toast.success('Comment posted successfully')
      }).catch(() => {
        toast.error('An error occurred')
      });
  }

  return (
    <DefaultLayout>
      <div className='flex w-full justify-center space-x-5'>
        {post && (
          <>

            {/*Like display purpose */}
            {showLikes && (
              <div className='w-96'>
                <div className='flex justify-between'>
                  <h1 className='text-xl font-semibold text-gray-500'>Liked By</h1>
                  <AiOutlineCloseCircle
                    className='cursor-pointer'
                    color='gray'
                    onClick={() => setShowLikes(false)}
                  />
                </div>
                <hr />
                {post.likes.map((like) => {
                  return <div className='flex item items-center card-sm p-2 mt-2'>
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
            <div className='cursor-pointer h-[550px] w-[550px]'>
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
                  <AiFillHeart
                    size={25}
                    onClick={likeOrUnlikePost}
                    color={alreadyLiked ? 'secondary' : '#9ca3af'} />
                  <h1
                    className='underline font-semibold cursor-pointer'
                    onClick={() => setShowLikes(true)}
                  >
                    {post.likes.length}
                  </h1>
                </div>
                <div className='flex space-x-2 items-center'>
                  <TfiCommentAlt size={25} />
                  <h1
                    className='underline text-xl cursor-pointer'
                    onClick={() => setShowComments(true)}
                  >
                    {post.comment.length}
                  </h1>
                </div>
                <div className='flex space-x-2 items-center'>
                  <FiShare
                    onClick={() => navigate(`/SharePost/${post.id}`)}
                    size={25}
                    color='gray'
                    className='cursor-pointer'
                  />
                </div>
              </div>
            </div>

            {/*comments info purpose */}
            {showComments && (
              <div className='w-96'>
                <div className='flex justify-between'>
                  <h1 className='text-xl font-semibold text-gray-500'>Comments</h1>
                  <AiOutlineCloseCircle
                    className='cursor-pointer'
                    color='gray'
                    onClick={() => setShowComments(false)}
                  />
                </div>
                {post.comments.map((comment) => {
                  return (
                    <div className='card-sm mt-2 p-2'>
                      <h1 className='text-xl text-gray-700'>
                        {comment.commentText}
                      </h1>
                      <hr />
                      <h1 className='text-right text-md'>
                        By <b>{getUserName(comment.email)}</b> on {comment.createdOn}
                      </h1>
                    </div>
                  );
                })}
                <div className='flex flex-col'>
                  <textarea
                    rows='2'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className='border-dashed border-gray-500 border-2 w-full md:w-full my-5 p-5'
                  >
                  </textarea>
                  <button className='bg-primary h-10 text-white px-5 rounded-lg mt-2 w-20 text-center' onClick={addComment}>Share!</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
}




export default PostDescription