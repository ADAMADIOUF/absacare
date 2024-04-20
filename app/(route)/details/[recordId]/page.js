"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import DoctorDetail from '../_components/DoctorDetail'
import DoctorSuggeestionList from '../_components/DoctorSuggeestionList'

const Details = ({params}) => {
  const[doctor,setDoctor]=useState([])
  useEffect(() => {
    getDoctorById()
  }, [])

  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then((resp) => {
       setDoctor(resp.data.data)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
        setError('Failed to fetch categories. Please try again later.')
      })
  }

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold texe-[22px]'> Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='col-span-2'>
       
          <DoctorDetail doctor={doctor} />
        </div>

        <div>
          <DoctorSuggeestionList/>
        </div>
      </div>
    </div>
  )
}

export default Details
