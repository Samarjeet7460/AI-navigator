import React from 'react'
import logo from '../assets/logo.webp'
import Help from "./Help";
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate('/help');
  };

  return (
    <div className='flex items-center justify-between w-full py-4'>
      <h1 className='sm:ml-9 w-[50px] ml-2'><img src={logo} alt="Logo" /></h1>
      <h1 className='sm:text-5xl font-bold text-4xl'>A.I. Navigator</h1>
      <button className='border border-black px-9 py-2 rounded-xl bg-black text-white font-bold mr-3 sm:mr-9' onClick={handleHelpClick}>Help</button>
    </div>
  )
}

export default Navbar