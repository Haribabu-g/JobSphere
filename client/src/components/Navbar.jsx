import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {useClerk , UserButton , useUser} from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const {openSignIn} = useClerk()
    const {user} = useUser()
    const navigate = useNavigate()

    const {setShowRecruiterLogin} = useContext(AppContext)

  return (
    <div className='shadow py-4 px-2'>
        <div className='className="w-full mx-0 px-0 2xl:px-20 flex justify-between'>
            <img className='cursor-pointer h-12 max-sm:h-8' onClick={()=> navigate('/') } src={assets.logo} alt="" />
            {
                user ? 
                <div className='flex items-center gap-3'>
                    <Link to={'/applications'}>Applied Jobs</Link>
                    <p>|</p>
                    <p className='max-sm:hidden'>Hi, {user.firstName + "" + user.lastName}</p>
                    <UserButton/>
                </div> 
                :  <div className='flex gap-4 max-sm:text-xs'>
                <button onClick={e=>setShowRecruiterLogin(true)} className=' font-bold  text-gray-800 cursor-pointer'>Recruiter Login</button>
                <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full font-bold cursor-pointer'>Login</button>
            
        </div>
}
    </div>
    </div>
  )
}

export default Navbar