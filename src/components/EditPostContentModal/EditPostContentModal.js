import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const EditPostContentModal = ({modal, setModal,refetch}) => {
    

    const handleEdit = (event) => {
        event.preventDefault();
        const form = event.target;
        const content = form.postContent.value;
        const postContentData ={
            postContent:content
        }
       
        fetch(`http://localhost:5000/updatedata/${modal?._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postContentData)
        })
            .then((response) => response.json())
            .then((data) => {
                refetch()
                toast.success(data.message, {autoClose:500})
            })
            .catch((error) => {
                toast.error(error,{autoClose:1000})
                
            });
            setModal(null)
    }

    return (
        <div>
            <input type="checkbox" id="edit-modal" className="modal-toggle" />
            <div className="modal">
                <form  onSubmit={handleEdit} className="modal-box bg-gray-200 relative">
                    <label htmlFor="edit-modal" onClick={()=>setModal(null)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Edit your post</h3>
                    <div className='mt-4 grid grid-cols-1 gap-2 place-items-center'>
                        <div className='form-control w-full max-w-xs'>
                            <textarea defaultValue={modal?.postContent} name='postContent' rows='4' type="text" required className='text-gray-800 rounded-md py-1 px-2 border border-gray-500' />
                        </div>
                        <button type='submit' className='bg-green-800 text-white p-2 w-full max-w-xs rounded-md' >Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostContentModal;