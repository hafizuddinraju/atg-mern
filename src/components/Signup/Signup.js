import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import '../Login/Login.css'
import { registerValidate } from '../Login/validate';
import { AuthDataContext } from '../../AuthContext/AuthContext';
import { saveUserMongodb } from '../AllFunction/MongoF';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate()
    const {CreateSignUp, profileUpdate, LogOut} = useContext(AuthDataContext);
    const [show, setShow] = useState({ password: false, cpassword: false })
    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })
     function onSubmit(values){
        console.log(values)
        CreateSignUp(values.email, values.password)
        .then(result =>{
            const user = result.user;
            console.log(user)
            const userInfo = {
                displayName: values.username
                
            }
            profileUpdate(userInfo)
            .then(()=>{
                saveUserMongodb(values.username, user?.email)
            toast.success('Signup Successful',{autoClose:500})
            LogOut();
            navigate('/');

            })
            
        })
        .catch(error =>{
            toast.error(error.message, {autoClose:500})
        })
        
        
      
    }
    return (
        <>
          <div className="flex h-screen">
            <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                <div className='imgStyle'>
                    <div className='cartoonLoginImg'></div>
                    <div className='cloud_one'></div>
                    <div className='cloud_two'></div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                    <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Sign Up</h1>
                <p className='w-3/4 mx-auto text-gray-900'>Dynamically evisculate integrated data rather than distinctive materials.</p>
            </div>

            {/* form */}
            <form className='flex flex-col  gap-5' onSubmit={formik.handleSubmit}>
                <div className={`input_group ${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    name='Username'
                    required
                    placeholder='Username'
                    className='input_text'
                    {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                {formik.errors.username && formik.touched.username ? <span className='text-rose-500 font-bold text-sm'>{formik.errors.username}</span> : <></>}
                <div className={`input_group ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    name='email'
                    required
                    placeholder='Email'
                    className='input_text'
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {formik.errors.email && formik.touched.email ? <span className='text-rose-500 font-bold text-sm'>{formik.errors.email}</span> : <></>}
                <div className={`input_group ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.password ? "text" : "password"}`}
                    name='password'
                    required
                    placeholder='password'
                    className='input_text'
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500 font-bold text-sm'>{formik.errors.password}</span> : <></>}

                <div className={`input_group ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    required
                    placeholder='Confirm Password'
                    className='input_text'
                    {...formik.getFieldProps('cpassword')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500 font-bold text-sm'>{formik.errors.cpassword}</span> : <></>}

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className='button'>
                        Sign Up
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                All ready account? <Link to='/'><span className='text-blue-700'>Login</span></Link>
            </p>
        </section>
                    </div>
                </div>
            </div>
  
        </div>
        </>
    );
};

export default Signup;