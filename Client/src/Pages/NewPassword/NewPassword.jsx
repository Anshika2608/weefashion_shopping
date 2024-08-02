import React, { useState,useEffect } from 'react'
import bgImage from "../../assets/image.png";
import { ToastContainer,toast } from 'react-toastify';
import { NavLink,useParams } from 'react-router-dom';
import axios from 'axios';
function newPassword() {
    const { id, token } = useParams();
    const [passwords, setPasswords] = useState("")
    const [message, setMessage] = useState("");
    const url="http://localhost:5000"
    const userValid = async () => {
        try {
            const res = await axios.get(`${url}/api/verifyForgot/ForgotPassword/${id}/${token}`, {
                
                headers: {
                    "Content-Type": "application/json"
                }
            });
       const data= await res.data;
      
    
            if (data.status === 201) {
                console.log("user valid");
            } else {
                toast.error("user not exist", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };
    const sendpassword = async (e) => {
        e.preventDefault();
       
        if (passwords === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (passwords.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else {
            const res = await axios.post(`${url}/api/change/${id}/${token}`, {
                passwords
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.data;

            if (data.status == 201) {
                setPasswords("")
                setMessage(true)
            } else {
                toast.error("! Token Expired generate new LInk",{
                    position: "top-center"
                })
            }
        }
    }

    useEffect(() => {
        userValid()
       
    }, [])
    return (
        <>
        <main className='w-screen bg-cover  mt-12 h-screen flex justify-end items-center md:pb-80 pr-4 sm:pr-20 pb-60' style={{ backgroundImage: `url(${bgImage})` }}>
        <section  className='   w-72 sm:w-[30rem] border-2 shadow-lg rounded-lg mt-40 bg-white '>
        <h1 className='font-bold mt-10  text-xl md:text-3xl  text-center'>Enter your new password</h1>
        {message ? <p className='font-bold text-center text-green-600 mt-3  '>password succcessfully updated</p> :<p className='h-6 mt-3'></p>}

            <div className='flex flex-col'>
                <label htmlFor="password" className='text-slate-800 font-bold  ml-8'>Password</label>
                <input type="password" value={passwords} onChange={e => setPasswords(e.target.value)} id='password' className='ml-8 p-2 mt-2 h-8 w-56 sm:w-96 border-2 rounded-md border-black outline-none' />

            </div>
            <button className='h-10 rounded-md  w-32 sm:w-72 pt-2 text-lg  block  mt-8 bg-slate-800 text-white text-center ml-20' onClick={sendpassword}>Submit</button>
            <p className='text-center text-blue-600 my-2'><NavLink to={"/Login"}  >Login</NavLink></p>
            <ToastContainer/>
        </section>
        </main>
       
           
        </>
    )
}

export default newPassword