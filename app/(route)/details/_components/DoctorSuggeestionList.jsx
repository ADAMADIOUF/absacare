import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const DoctorSuggeestionList = () => {
 const [doctorList, setDoctorList] = useState([])
 useEffect(() => {
   getDoctorList()
 }, [])

 const getDoctorList = () => {
   GlobalApi.getDoctorList()
     .then((resp) => {
       setDoctorList(resp.data.data)
     })
     .catch((error) => {
       console.error('Error fetching categories:', error)
       setError('Failed to fetch categories. Please try again later.')
     })
 }

  return (
    <div className='p-4 border-[1px] mt-5 md:ml-5'>
      <h2>suggestions</h2>
    
        {doctorList.length > 0
          ? doctorList.map((item, index) => (
              <div
                key={index}
                className=' mb-4 p-3 shadow-sm w-full cursor-pointer hover:bg-slate-100 rounded-lg flex items-center gap-3'
              >
                <Image
                  src={item?.attributes?.Image?.data?.attributes?.url}
                  alt='doctors'
                  width={70}
                  height={70}
                  className='h-[70px] w-[70px] rounded-sm object-cover '
                />
                <div className='mt-3 items-baseline flex flex-col gap-2'>
                  <h2 className='text-[15px] bg-blue-100 p-1 rounded-full px-2 text-black'>
                    {item?.attributes?.categories?.data[0]?.attributes?.Name}
                  </h2>
                  <h2 className='font-bold'>{item.attributes.Name}</h2>
                  <h2 className='text-primary text-sm'>
                    {item.attributes.Year_of_Experience}
                  </h2>
                 
                  
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className='h-[220px] bg-slate-200 w-full rounded-lg animate-pulse'
              ></div>
            ))}
     
    </div>
  )
}

export default DoctorSuggeestionList
