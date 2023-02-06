import React, { useState } from 'react';
import { AiOutlineLike,AiFillDelete, AiOutlineComment } from "react-icons/ai";
import {TbEdit} from "react-icons/tb"
import AddComment from '../AddComment/AddComment';
import EditPostContentModal from '../EditPostContentModal/EditPostContentModal';
const AllPost = ({post, handleDeletePost,refetch}) => {
    const [modal, setModal] = useState({})
    const [count, setCount] = useState(0)

    const handleLike = ()=>{
        setCount(count + 1)

    }
    
    return (
        <div className="my-4 max-w-screen-sm mx-auto p-4 rounded-md bg-gray-50 hadow-lg">
            <div className='my-2 ml-3 flex justify-between items-center'>
                <div className="flex items-center space-x-2">
                    <img className="w-10 bg-black py-4 rounded-full" src='' alt="" />
                    <div>
                        <h2 className="text-gray-800 font-bold cursor-pointer">{post?.username}
                        </h2>
                        <p className='text-sm'>{post?.email}</p>
                    </div>
                </div>
                <div className="dropdown dropdown-left">
                    
                    <ul  className="p-2 shadow bg-gray-200 flex justify-between w-40">
                        <li>
                            <label htmlFor="edit-modal" className=''>
                               <TbEdit onClick={()=>setModal(post)} ></TbEdit>
                            </label>
                        </li>
                        <li>
                        <label>
                                <AiFillDelete onClick={()=>handleDeletePost(post?._id)}  className='text-red-500 cursor-pointer'></AiFillDelete>
                            </label>
                            
                        </li>
                    </ul>
                </div>
               

            </div>
            <div className="space-y-1 mb-4">
                <div className="space-y-2">
                    <div className="p-2 border-t border-gray-400">
                        <div className="flex items-center space-x-1">
                            <span className='text-orange-600'>{post?.postContent}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between border-t border-b border-gray-400 px-4 py-2'>
                <div onClick={()=>handleLike()} className='flex items-center hover:bg-gray-300 hover:text-blue-600 px-3 py-1 cursor-pointer rounded transition duration-200 ease-in'>
                    <AiOutlineLike className='text-2xl'></AiOutlineLike>
                    <span className='mx-1 text-md font-semibold'>Like {count}</span>
                </div>
                <div className='flex items-center hover:bg-gray-300 px-3 py-1 cursor-pointer rounded transition duration-200 ease-in'>
                    <AiOutlineComment className='text-2xl'></AiOutlineComment>
                    <span className='mx-1 text-md font-semibold'>Comment</span>
                </div>
            </div>
            <AddComment post={post}></AddComment>
            {
                modal && <EditPostContentModal
                modal={modal}
                setModal={setModal}
                refetch={refetch}
                >
                </EditPostContentModal>

            }
            
        </div>
    );
};

export default AllPost;