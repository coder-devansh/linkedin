
import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = () => {
  return (
    <div className='p-5 rounded-medium shadow-xl bg-white border-gray-100 cursor-pointer'>
        <div className='font-medium text-lg '>
        <h1>Company Name</h1>
        <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Job Title</h1>
            <p className='text-sm text-gray-600'>tatibus iste dolores vitae doloremque modi repellat quod, sunt rem!</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold ' } variant='ghost'>12 Positions</Badge>
            <Badge className={'text-[#F83002] font-bold ' } variant='ghost'>Part Time </Badge>
            <Badge className={'text-[#7209b7] font-bold '}  variant='ghost'>24 LPA</Badge> 
       
            

        </div>

      
    </div>
  )
}

export default LatestJobCards
