import React, { useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cart from '../../Components/Cart/Cart';
import {loadStripe} from "@stripe/stripe-js"
import { useLocation } from 'react-router-dom';
function PlaceOrder() {
    const location = useLocation();
    const { totalAmount, PreviousAmount } = location.state || { totalAmount: 0, PreviousAmount: 0 };
    const url = "https://weefashion-backend.onrender.com";
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });
  const makePayment=async()=>{
    const stripe=await loadStripe("pk_test_51Q1VhFGOB3MpsHa68zznQZ0fFGismuEKdshdpW5p7S8tp4TlDcXSw9f2CJCU1nf5iFKboHogRNoLdqDQCoz8z9Ph00WvENZnwB")
    
  }
    const handleSubmit = async () => {
        const { fname, lname, email, street, city, state, zipCode, country, phone } = formData;

        const nameRegex = /^[A-Za-z]{2,50}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        console.log("Form Data:", formData);
        if (Object.values(formData).some(field => field === "")) {
            toast.error("Fill all details", { position: "top-right" });
            return;
        } else if (!nameRegex.test(fname) || !nameRegex.test(lname)) {
            toast.error("First and last names must be between 2 to 50 characters and contain only alphabets.", { position: "top-right" });
            return;
        } else if (!phoneRegex.test(phone)) {
            toast.error("Contact number must be a 10-digit number starting with 6, 7, 8, or 9.", { position: "top-right" });
            return;
        } else if (!emailRegex.test(email)) {
            toast.error("Please provide a valid email address.", { position: "top-right" });
            return;
        }

        try {
            const response = await axios.post(`${url}/order/`, {
                fname,
                lname,
                email,
                street,
                city,
                state,
                zipCode: zipCode.toString(),
                country,
                phone: phone.toString()
            });

            setFormData({
                fname: "",
                lname: "",
                email: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                phone: ""
            });

            toast.success("Order placed successfully!", { position: "top-right" });

        } catch (error) {
            console.log("Error:", error.response ? error.response.data : error.message);
            toast.error("Failed to save delivery information", { position: "top-right" });
        }
    };

    return (
        <>
            <div className='flex flex-col sm:flex-row justify-between gap-4 pt-24 min-h-[80vh] border-t'>
                <div className='flex flex-col gap-4 w-full sm:max-w-[480px] ml-20 mt-10'>
                    <h1 className='text-3xl font-semibold my-3 mx-20'>Delivery Information</h1>
                    <div className='flex justify-between gap-2'>
                        <input type="text" placeholder='First Name' name="fname" onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.fname} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" placeholder='Last Name' name="lname" value={formData.lname} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                    </div>
                    <div>
                        <input type="email" placeholder='Email' name="email" value={formData.email} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                    </div>
                    <div>
                        <input type="text" placeholder='Street' name="street" value={formData.street} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                    </div>
                    <div className='flex justify-between gap-2'>
                        <input type="text" placeholder='City' name="city" value={formData.city} onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" placeholder='State' name="state" onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                    </div>
                    <div className='flex justify-between gap-2'>
                        <input type="text" name="zipCode" placeholder='Zipcode' onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.zipCode} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" name="country" placeholder='Country' onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.country} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                    </div>
                    <div>
                        <input type="text" placeholder='Contact Number' onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.phone} name="phone" className='p-3 w-full h-10 border-2 border-gray-300 rounded' />
                    </div>
                    <div className='self-center'>
                        <button onClick={handleSubmit} className='w-72 h-10 text-center cursor-pointer bg-black text-white rounded-md'>
                            Save Address
                        </button>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center mb-20'>
                    <Cart
                    
                        previousAmount={PreviousAmount}
                        totalAmount={totalAmount}
                        onProceed={() => History("/place-order")}
                    />
                    <div className=''>
                    <button className='border-2 border-black hover:border-green-500 rounded-md w-40 h-8 mt-4 ml-20' onClick={makePayment}>
                        Pay with Stripe
                    </button>
                    <button className='border-2 border-black hover:border-green-500 rounded-md w-40 h-8 mt-4 ml-3'>
                        Pay with RazorPay
                    </button>
                    <button className='border-2 border-black hover:border-green-500 rounded-md w-40 h-8 mt-4 ml-3'>
                        Pay with PhonePay
                    </button>
                    </div>
                    
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default PlaceOrder;
