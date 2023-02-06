import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { FcCdLogo } from 'react-icons/fc';
import { IoSendSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthDataContext } from '../../AuthContext/AuthContext';
import MediumSpinner from '../Spinner/MediumSpinner';
const AddComment = ({ post }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthDataContext);
    const [dataPost, setDataPost] = useState([])
    const [loading, setLoading] = useState(false)

    const handleComment = (event) => {
        event.preventDefault();
        const comment = event.target
        const comments = comment.commentContent.value
        console.log(comments)
        const commentAdd = {
            post_Id:post?._id,
            comment_email:user?.email,
            comment:comments

        }
        fetch('http://localhost:5000/addComment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
                
            },
            body: JSON.stringify(commentAdd)
        })
        .then(res => res.json())
        .then(result =>{
            setLoading(!loading);
            comment.reset()
            toast.success(result.message, {autoClose:500})

        })
        .catch(error =>{
            toast.error(error,{autoClose:1000})
        })
      
    }
    useEffect(()=>{
        fetch(`http://localhost:5000/addComment/${post?._id}`)
        .then(res => res.json())
        .then(result =>{
            setDataPost(result.data)
            setLoading(false)
            console.log(result.data)
        })

    },[post?._id, loading])
    
   
    if(!dataPost){
        return <MediumSpinner></MediumSpinner>
    }
    return (
        <div className='py-2'>
            <form onSubmit={handleComment}>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-200">
                    <textarea rows="1" name="commentContent" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 " placeholder="Your comment..."></textarea>

                    <button type="submit" className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer  hover:text-green-700">
                        <IoSendSharp className='text-2xl'></IoSendSharp>
                    </button>
                </div>
            </form>
            {
                    dataPost?.map(cm =>{
                        return(
                            <div  key={cm?._id}>
                            <div className='flex justify-between px-5 py-2'>
                
                <p>{cm?.comment}</p>
                <p className='text-gray-400'>{cm?.comment_email}</p>
                </div>
                <hr />
                            
                            
                            </div>
                            
                        )
                    })
                }
            
        </div>

    );
};

export default AddComment;