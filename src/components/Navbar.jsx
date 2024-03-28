import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white fixed top-0 w-full z-10'>
        <div className="myContainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold text-white text-xl">
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
            </div>
        <button className='bg-green-700 rounded-full text-white my-5 flex justify-center items-center ring-white ring-1'>
            <img className='invert w-10 p-1' src="/assets/github.svg" alt="" />
            <span className='font-bold px-2'>GitHub</span>
            
        </button>
        
        </div>
    </nav>
  )
}

export default Navbar
