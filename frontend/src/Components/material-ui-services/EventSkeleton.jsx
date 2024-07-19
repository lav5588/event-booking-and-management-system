import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { FaHeart } from 'react-icons/fa6';

const data = [1,2,3,4,5,6,7]


const EventSkeleton = () => {
  return (
    <div className='flex flex-wrap sm:mx-14 rounded-lg bg-[#21787333] gap-3 my-5 justify-center'>
      {
        data.map(Id=>{
            return (
                <div key={Id} className='p-2.5 m-2.5 w-96  shadow-md bg-white  rounded-lg hover:shadow-gray-900 hover:scale-105 hover:shadow-2xl'  >
                <Skeleton variant="rectangular" height={240} width={360} className=' rounded-lg' alt="" />
                <div  className='cursor-pointer'>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
        
              </div>
            )
  
        })
      }
    </div>
  )
}

export default EventSkeleton


