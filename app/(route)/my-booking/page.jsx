'use client'
// MyBooking.js
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const MyBooking = () => {
  const [loading, setLoading] = useState(true)
  const [bookingList, setBookingList] = useState([])
  useEffect(() => {
    getUserBookingList()
  }, [])
  const { user } = useKindeBrowserClient()
  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email)
      .then((resp) => {
        console.log(resp.data.data)
        setBookingList(resp.data.data)
      })
      .finally(() => setLoading(false)) // Set loading to false when API call completes
  }
  const filterUserBooking = (type) => {
    const currentDate = new Date()
    const result = bookingList.filter((item) =>
      type == 'upcoming'
        ? new Date(item.attributes.Date) >= currentDate
        : new Date(item.attributes.Date) <= currentDate
    )
    console.log(result)
    return result
  }

  return (
    <div className='px-4 sm:px10 mt-10'>
      <h2 className='font-bold text-2xl'>My Booking</h2>
      <Tabs defaultValue='upcoming' className='w-full mt-5'>
        <TabsList className='w-full justify-start'>
          <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
          <TabsTrigger value='expired'>Expired</TabsTrigger>
        </TabsList>
        <TabsContent value='upcoming'>
          <BookingList
            bookingList={filterUserBooking(`upcoming`)}
            updateRecord={() => getUserBookingList}
            expired={false}
          />
        </TabsContent>
        <TabsContent value='expired'>
          <BookingList
            bookingList={filterUserBooking(`expired`)}
            updateRecord={() => getUserBookingList}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MyBooking
