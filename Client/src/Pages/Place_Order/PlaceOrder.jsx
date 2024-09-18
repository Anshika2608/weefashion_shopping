import React from 'react'

function PlaceOrder() {
    return (
        <>
           
            <div className='flex flex-col sm:flex-row justify-between gap-4 pt-24  min-h-[80vh] border-t'>
                <div className='flex flex-col gap-4 w-full  sm:max-w-[480px] ml-20 mt-10'>
                    <h1 className='text-3xl font-semibold my-3 mx-20'>Delivery Information</h1>
                    <div className='flex  justify-between gap-2'>
                        <input type="text" placeholder='first name' name="fname" className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" placeholder='last name' name="lname" className='p-4 w-full h-10 border-2  border-gray-300 rounded' />

                    </div>
                    <div>
                        <input type="email" placeholder='Email' name="email" className='p-4 w-full h-10 border-2  border-gray-300 rounded' />
                    </div>
                    <div>
                        <input type="text" placeholder='Street' name="street" className='p-4 w-full h-10   border-2 border-gray-300 rounded' />
                    </div>
                    <div className='flex  justify-between gap-2'>
                        <input type="text" placeholder='City' name="city" className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" placeholder='State' name="state" className='p-4 w-full h-10 border-2  border-gray-300 rounded' />

                    </div>
                    <div className='flex  justify-between gap-2'>
                        <input type="number" name="zipcode" placeholder='Zipcode' className='p-4 w-full h-10 border-2 border-gray-300 rounded' />
                        <input type="text" name="country" placeholder='Country' className='p-4 w-full h-10 border-2  border-gray-300 rounded' />

                    </div>
                    <div>
                        <input type="Phone" placeholder=' Contact Number' name="Phone" className='p-3 w-full h-10   border-2 border-gray-300 rounded' />

                    </div>
                    <div className='self-center'>
                        <button className=' w-72 h-10 text-center cursor-pointer  bg-black text-white rounded-md'>
                            Save Address
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PlaceOrder