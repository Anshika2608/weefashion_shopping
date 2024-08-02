import React, { useState } from 'react'
import bgImage from "../../assets/image.png";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function ForgotPassword() {
    const [message, setMessage] = useState("");
    const [emailaddress, setEmailaddress] = useState("")
    const url="https://weefashion-shopping-backend-01lg.onrender.com"
    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!emailaddress.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else {
            try {
                const res = await axios.post(`${url}/api/changePassword/sendpasswordLink`, {
                    emailaddress
                });

                const data = res.data;

                if (data.status === 201) {
                    setMessage(true);
                    setEmailaddress("");
                    
                } else {
                    toast.error("Invalid User", {
                        position: "top-center"
                    });
                }
            } catch (error) {
                console.error("Error details:", error.response);
                toast.error("An error occurred while sending the request", {
                    position: "top-center"
                });
            }
        }
            }
        
    return (
        <>
        <main className='w-screen bg-cover  mt-12 h-screen flex justify-end items-center md:pb-80 pr-4 sm:pr-20 pb-60' style={{ backgroundImage: `url(${bgImage})` }}>
        <section  className='   w-72 sm:w-[30rem] border-2 shadow-lg rounded-lg mt-40 bg-white '>
        <h1 className='font-bold mt-8  text-xl md:text-3xl  text-center'>Enter your Email Address</h1>
        {message ? <p className='font-bold text-center text-green-600 mt-3  mx-1 '>password reset link send Successfully in Your Email</p> :<p className='h-6 mt-3'></p>}
            <div className='flex flex-col'>
                <label htmlFor="email" className='text-slate-800 font-bold mt-4 ml-8'>Email</label>
                <input type="email" value={emailaddress} onChange={e => setEmailaddress(e.target.value)} id='email' className='ml-8 p-2 mt-2 h-8 w-56 sm:w-96 border-2 rounded-md border-black outline-none' />

            </div>
            <button className='h-8 rounded-md  w-32 sm:w-72 my-8 bg-slate-800 text-white text-center ml-20' onClick={sendLink}>Send</button>
        </section>
        <ToastContainer />
        </main>
       
           
        </>
    )
}

export default ForgotPassword
