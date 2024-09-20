import React,{useState} from 'react'
import axios from "axios";

function PlaceOrder() {
    const url="https://weefashion-backend.onrender.com"
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
    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === 'phone' || name === 'zipcode' ? Number(value) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };
    const handleSubmit=async()=>{
       const response=await axios.post(`${url}/order/`,{
              fname,lname,email,street,city,state,zipCode,country,phone
       })
       setFormData(response.data)
    }
    return (
        <>
           
            <div className='flex flex-col sm:flex-row justify-between gap-4 pt-24  min-h-[80vh] border-t'>
                <div className='flex flex-col gap-4 w-full  sm:max-w-[480px] ml-20 mt-10'>
                    <h1 className='text-3xl font-semibold my-3 mx-20'>Delivery Information</h1>
                    <div className='flex  justify-between gap-2'>
                        <input type="text" placeholder='first name' name="fname" value={formData.fname} onChange={handleChange}  className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" placeholder='last name' name="lname"   value={formData.lname} onChange={handleChange}  className='p-4 w-full h-10 border-2  border-gray-300 rounded' />

                    </div>
                    <div>
                        <input type="email" placeholder='Email' name="email"  value={formData.email} onChange={handleChange} className='p-4 w-full h-10 border-2  border-gray-300 rounded' />
                    </div>
                    <div>
                        <input type="text" placeholder='Street' name="street"   value={formData.street} onChange={handleChange} className='p-4 w-full h-10   border-2 border-gray-300 rounded' />
                    </div>
                    <div className='flex  justify-between gap-2'>
                        <input type="text" placeholder='City' name="city"  value={formData.city} onChange={handleChange} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" placeholder='State' name="state" onChange={handleChange} className='p-4 w-full h-10 border-2  border-gray-300 rounded' />

                    </div>
                    <div className='flex  justify-between gap-2'>
                        <input type="number" name="zipCode" placeholder='Zipcode' onChange={handleChange} value={formData.zipCode} className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" name="country" placeholder='Country' onChange={handleChange} value={formData.country} className='p-4 w-full h-10 border-2  border-gray-300 rounded' />

                    </div>
                    <div>
                        <input type="Phone" placeholder=' Contact Number' onChange={handleChange} value={formData.phone} name="Phone" className='p-3 w-full h-10   border-2 border-gray-300 rounded' />

                    </div>
                    <div className='self-center'>
                        <button onClick={handleSubmit} className=' w-72 h-10 text-center cursor-pointer  bg-black text-white rounded-md'>
                            Save Address
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PlaceOrder