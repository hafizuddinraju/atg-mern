import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPasswordModal = ({ visible, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    if (!visible) {
        return null;
    }
    const handleToggleShowPassword = () => setShowPassword(!showPassword)

    const onSubmit = (data) => {
        data.preventDefault();
        const form = data.target;
        const email = form.email.value;
        const password = form.password.value;

        const resetData = {
            email: email,
            password: password
        }

        fetch("https://atg-world-mern-server.vercel.app/api/v1/forget-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                if (data.success) {
                    // localStorage.setItem("user", JSON.stringify(data.results));
                    toast.success("Password changed Successfully!");
                    navigate("/");
                }
                else {
                    toast.error("Error!");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                navigate("/");
            });
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={onSubmit} className="modal-box bg-gray-300 relative">
                    <label htmlFor="my-modal-3" onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Reset your password</h3>
                    <div className='form-control flex flex-col w-full max-w-xs'>
                        <label className='label'><span className='label-text font-semibold'>Email <span className='text-red-500'>*</span></span></label>
                        <input type="email" name='email' placeholder='Enter your valid email' className='rounded-md py-1 px-2 border border-gray-500' />
                    </div>
                    <div className='relative form-control flex flex-col w-full max-w-xs'>
                        <label className='label'><span className='label-text font-semibold'>Password <span className='text-red-500'>*</span></span></label>
                        <input type={showPassword ? "text" : "password"} name='password' placeholder='New password' className='rounded-md py-1 px-2 border border-gray-500' />

                        <div className='absolute bottom-[5px] right-1 cursor-pointer' onClick={handleToggleShowPassword}>
                            {showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                            ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            )}
                        </div>

                    </div>
                    <input type="submit" value='Reset' className='mt-6 cursor-pointer font-semibold text-white w-full max-w-xs bg-green-600 hover:bg-green-700 p-2 rounded-md' />
                </form>
            </div>
        </div>
    );
};

export default ForgetPasswordModal;