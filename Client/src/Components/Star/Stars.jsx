import React from 'react'
import { FaStar,FaStarHalfAlt } from 'react-icons/fa'
import {AiOutlineStar} from "react-icons/ai"
const Stars = ({stars,reviews}) => {
    const ratingStar=Array.from({length:5},(elem,index)=>{
        let number=index+0.5;
        return (
           <span key={index} >
            {stars>=index+1?<FaStar className='text-yellow-400 '/>:(stars>=number)?<FaStarHalfAlt className='text-yellow-400'/>:<AiOutlineStar className='text-yellow-400 text-xl'/>}
           </span>
          )
    })
  return(
    <>
     <div className='flex pt-2 gap-2'>
     <p className='pt-1 flex text-lg gap-1'>{ratingStar}</p>
     <p className='pt-px' >{stars}</p>
     <p className='pt-px'>({reviews} Customer reviews)</p>
     </div>
    </>
   
  )
}

export default Stars