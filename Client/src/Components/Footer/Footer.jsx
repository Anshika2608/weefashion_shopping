import React from 'react'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'
function Footer() {
  return (
 <>
 <footer className='bottom-0 border-t-2 h-60 w-full  mb-0'>
    <div className=' flex md:flex-row lg:flex-row flex-col items-center  justify-around'>
        <div >
        <img src={Logo} alt="logo" className='h-16 w-48 my-16' /></div>
        <div className='hidden  lg:block'>
          <div className='font-bold mt-4 text-xl mb-4'>Resources</div>
          <div className=' flex flex-col gap-3 list-none justify-around text-md font-bold text-slate-500 '>
            <li><Link to={"/"} className=' hover:underline'>Home</Link></li>
            <li><Link to={"/Men"} className='hover:underline'>Men</Link></li>
            <li><Link to={"/Women"} className='hover:underline'>Women</Link></li>
            <li><Link to={"/Kids"} className='hover:underline'>Kids</Link></li>
          </div>

        </div>
        <div>
        <div className='font-bold w-36 mt-4 text-xl mb-4'>Follow Us</div>
          <div className=' flex flex-col gap-3 list-none justify-around text-md font-bold text-slate-500 '>
            <li><Link  className=' hover:underline'>Github</Link></li>
            <li><Link  className='hover:underline'>Twitter</Link></li>
            <li><Link  className='hover:underline'>Facebook</Link></li>
            <li><Link  className='hover:underline'>Instagram</Link></li>
          </div>
        </div>
        <div>
        <div className='font-bold mt-4 text-xl mb-4'>Legal</div>
          <div className=' flex flex-col gap-3 list-none justify-around text-md font-bold text-slate-500  '>
          <li><Link  className=' hover:underline'>Privacy Policy</Link></li>
            <li><Link  className='hover:underline'>Terms & Conditions</Link></li>
            <li><Link  className='hover:underline'>Shipping Guidelines</Link></li>
            <li><Link  className='hover:underline'>Security Guidelines</Link></li>
            
          </div>
        </div>
        <div>
        <div className='font-bold mt-4 text-xl mb-4'>Customer Policies </div>
          <div className=' flex flex-col gap-3 list-none justify-around text-md font-bold text-slate-500 '>
          <li><Link  className=' hover:underline'>Cancellation</Link></li>
            <li><Link  className='hover:underline'>Returns</Link></li>
            <li><Link  className='hover:underline'>FAQ</Link></li>
            <li><Link  className='hover:underline'>Contact Us</Link></li>
            
          </div>
        </div>
        </div>
    

 </footer>
 </>
  )
}

export default Footer