import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import newImage from "../../assets/newImage.jpg"

function NewProduct() {
    const [Title, setTitle] = useState("");
    const [company, setCompanys] = useState("");
    const [previous_price, setPreviousPrice] = useState();
    const [Current_price, setCurrentPrice] = useState();
    const [discount, setDiscount] = useState("");
    const [gender, setGender] = useState("");
    const [type, setType] = useState("");
const url="http://localhost:5000"
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Title || !company || !previous_price || !Current_price || !discount || !gender || !type) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const response = await axios.post(`${url}/api/Clothing/NewProduct`, {
                Title,
                company,
                previous_price,
                Current_price,
                discount,
                gender,
                type
            });
            toast.success(response.data.message);
            console.log(response.data.message);
            setTitle("");
            setCompanys("");
            setPreviousPrice("");
            setCurrentPrice("");
            setDiscount("");
            setGender("");
            setType("");
        } catch (error) {
            toast.error("There was an error adding the product!");
            console.error("There was an error adding the product!", error);        }
    };
    return (
        <>
            <div className='mt-24 flex flex-col w-full bg-cover' style={{ backgroundImage: `url(${newImage})` }}>
                <h1 className='text-3xl mb-10 font-bold text-center'>New Product</h1>
                <div className='flex flex-col gap-4 justify-center items-center'>

                    <div className='flex flex-col'>
                        <label htmlFor="title" className='font-bold'>Title</label>
                        <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} className='h-10 w-80 rounded-md border-2 outline-none  p-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="company" className='font-bold'>Company</label>
                        <input type="text" value={company} onChange={(e) => setCompanys(e.target.value)} className='h-10 w-80 rounded-md border-2 outline-none  p-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="type" className='font-bold'>Gender</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className='h-10 w-80 rounded-md border-2 outline-none p-2'>
                            <option value="Bottomwear">Men</option>
                            <option value="Topwear">Women</option>
                            <option value="Kidswear">Kids</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="type" className='font-bold'>Type</label>
                        <select value={type} onChange={(e) => setType(e.target.value)} className='h-10 w-80 rounded-md border-2 outline-none p-2'>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Topwear">Topwear</option>
                            <option value="Kidswear">Kidswear</option>
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="Previous_Price" className='font-bold'>Previous Price</label>
                        <input type="number" value={previous_price} onChange={(e) => setPreviousPrice(e.target.value)} className='h-10 w-80 rounded-md border-2 outline-none  p-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="Current_Price" className='font-bold'>Current Price</label>
                        <input type="number" value={Current_price} onChange={(e) => setCurrentPrice(e.target.value)} className='h-10 w-80 rounded-md border-2 outline-none  p-2' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="discount" className='font-bold'>Discount</label>
                        <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} className='h-10 w-80 rounded-md border-2 outline-none  p-2' />
                    </div>
                    <div>
                        <button className='w-40 h-8 rounded-md bg-lime-400 text-black mb-60' onClick={handleSubmit}>Submit</button>
                    </div>



                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default NewProduct