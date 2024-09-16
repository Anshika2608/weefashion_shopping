import React from 'react'

function PlaceOrder() {
    return (
        <>
            {/* <div className='pt-24 w-full'>
                <div className="flex flex-col ml-40 mt-20">
                 
                </div>
            </div> */}
            <div className='flex flex-col sm:flex-row justify-between gap-4 pt-24  min-h-[80vh] border-t'>
             <div className='flex flex-col gap-4 w-full  sm:max-w-[480px] '>
             <h1 className='text-3xl font-semibold my-3 mx-20'>Delivery Information</h1>
             <div className='flex gap-3'>
                <input type="text" placeholder='first name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                <input type="text" placeholder='last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

             </div>
             </div>
            </div>


        </>
    )
}

export default PlaceOrder