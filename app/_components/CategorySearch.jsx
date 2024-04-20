"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

const CategorySearch = () => {
  const [error, setError] = useState(null)
const[categoryList,setcategoryList]=useState([])
 const [selectedCategory, setSelectedCategory] = useState(null)
  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((resp) => {
       
      setcategoryList(resp.data.data)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
        setError('Failed to fetch categories. Please try again later.')
      })
  }

  return (
    <div className='mb-10 items-center flex flex-col gap-4 '>
      {error && <p className='text-red-500'>{error}</p>}
      <h2 className='font-bold text-4xl tracking-wide'>
        Search <span className='text-primary'>Doctors</span>
      </h2>
      <p className='tex-gray-500 text-xl'>
        Search Your Doctor and Book Appointment in one click
      </p>
      <div className='flex w-full max-w-sm items-center space-x-2 mt-3'>
        <Input type='email' placeholder='Search' />
        <Button type='submit'>
          <Search className='h-4 w-4 mr-2' />
          Search
        </Button>
      </div>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-5'>
        {categoryList.map((item, index) => index < 6 && (
          <Link href={`/search/`+item?.attributes?.Name} key={index} className='flex flex-col text-center gap-2 cursor-pointer items-center p-5 bg-blue-50 m-2 rounded-lg hover:scale-110 transition-all ease-in-out'>
            <Image
              src={item.attributes?.Icon?.data[0]?.attributes?.url}
              alt='icon'
              width={100}
              height={40}
            />
            <label className='text-blue-600 text-sm'>{item?.attributes?.Name}</label>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategorySearch
