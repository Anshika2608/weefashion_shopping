import React from 'react'

function Features({source,text,bgcolor}) {
  return (
    <>
    <div className='border-2 h-44 w-40 flex justify-evenly items-center flex-col rounded-lg mr-16 shadow-md my-7'>
      <img src={source} alt="feature" className='h-24 w-32'/>
      <p className={`text-emerald-600 w- px-2 py-0.5 font-bold ${bgcolor} rounded-md `}>{text}</p>

    </div>
    </>
  )
}

export default Features