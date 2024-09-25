import React from 'react';

const Cart = ({ previousAmount, totalAmount }) => {
    
    return (
        <div className='flex flex-col gap-4 mt-12'>
            <h2 className='text-2xl font-bold mx-12'>Cart Totals</h2>
            <div className='flex flex-col gap-2 mx-12'>
                <p className='text-lg font-semibold flex'>
                    <span className='w-40'>Total Amount:</span>
                    <span className='w-20'>Rs.{previousAmount}</span>
                </p>
                <p className='text-lg font-semibold flex'>
                    <span className='w-40'>After Discount:</span>
                    <span className='w-20'>Rs.{totalAmount}</span>
                </p>
               
               
            </div>
        </div>
    );
};

export default Cart;
