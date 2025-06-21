import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='cw-full mx-0 px-2 2xl:px-20  flex items-center justify-between gap-4 py-3 mt-20'>
        
            <img className='max-sm:h-10' width={160} src={assets.logo} alt="" />
            <p className='flex-1 border-l border-gary-400 pl-4 test-sm text-gray-500 max-sm:hidden'>Copyright @haribabu.dev | All Rights Reserved</p>
            <div className='flex gap-2.5'>
                <img width={38} src={assets.twitter_icon} alt="" />
                <img width={38} src={assets.instagram_icon} alt="" />
                <img  width={38} src={assets.facebook_icon} alt="" />
            </div>
        </div>
    
  )
}

export default Footer