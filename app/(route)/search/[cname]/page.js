"use client"
import DoctorList from '@/app/_components/DoctorList'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

const Search = ({ params }) => {
  const [doctorlist, setDoctorList] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getDoctors()
  }, [params]) 

  const getDoctors = () => {
    GlobalApi.getDoctorByCategory(params.cname)
      .then((resp) => {
        setDoctorList(resp.data.data)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
        setError('Failed to fetch categories. Please try again later.')
      })
  }

  return (
    <div className='mt-5'>
      <DoctorList heading={params.cname} doctorList={doctorlist} />
    </div>
  )
}

export default Search
