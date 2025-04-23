import React from 'react'

const Card = ( {icon, title, value} ) => {
  return (
    <div className='bg-white text-black p-2 py-5 rounded-lg shadow-md flex items-center space-x-4 box-border dark:bg-[#ffffffc6]'>
        <div className='text-4xl px-2 '>{icon}</div>
        <div>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <p className='text-4xl '>{value}</p>
        </div>
    </div>
  )
}

export default Card




