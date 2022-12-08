import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { TfiCommentAlt } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';

function Post(post) {
    const navigate = useNavigate();
    const getUserName = () => {
        const email = post.user.email;
        const userName = email.substring(0, email.length - 10)
        return userName;
    }

    return (
        <div onClick={()=>navigate(`/post/${post.id}`)} className='cursor-pointer'>
            <div className='flex item items-center card-sm p-2'>
                <div className='h-10 w-10 rounded-full bg-primary flex justify-center items-center text-white mr-2'>
                    <span className='text-2xl '>
                        {getUserName()[0]}
                    </span>
                </div>
                <span>{getUserName()}</span>
            </div>
            <div className='w-full text-center justify-center flex card-sm'>
                <img src={post.imageURL} alt='' className='h-60 w-60' />
            </div>
            <div className='card-sm p-2 flex w-full items-center space-x-5'>
                <div className='flex space-x-2 items-center'>
                    <AiOutlineHeart size={25} />
                    <h1>{post.likes.length}</h1>
                </div>
                <div className='flex space-x-2 items-center'>
                    <TfiCommentAlt size={25} />
                    <h1>{post.comment.length}</h1>
                </div>
            </div>
        </div>
    );
}

export default Post