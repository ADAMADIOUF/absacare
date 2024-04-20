import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image'
import React from 'react'
import CancelAppointment from './CancelAppointment';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';

const BookingList = ({ bookingList, expired, updateRecord }) => {
  const onDeliteBooking = (item) => {
    console.log(item)
    GlobalApi.deleteBooking(item.id).then((resp) => {
      console.log(resp)
      if (resp) {
        toast('Booking Deleted Successfully')
        updateRecord()
      }
    })
  }
  return (
    <div>
      {bookingList.map((item, index) => (
        <div
          key={index}
          className='flex gap-2 items-center border p-5 m-3  rounded-lg'
        >
          <Image
            src={
              item?.attributes?.doctor?.data?.attributes?.Image?.data
                ?.attributes?.url
            }
            alt='doctors'
            width={100}
            height={100}
            className='h-[70px] w-[70px] object-cover rounded-full'
          />
          <div className=' flex flex-col gap-2 w-full'>
            <h2 className='font-bold tex-[18px] items-center flex justify-between'>
              {item?.attributes?.doctor?.data?.attributes?.Name}
              {!expired && (
                <CancelAppointment
                  onContineClick={() => onDeliteBooking(item)}
                />
              )}
            </h2>
            <h2 className='flex gap-2 text-gray-500'>
              <MapPin className='text-primary' />{' '}
              {item?.attributes?.doctor?.data?.attributes?.Address}
            </h2>
            <h2 className='flex gap-2 '>
              <Calendar className='text-primary' /> Appointment On:{' '}
              {moment(item?.attributes?.Date).format('DD-MM-YYYY')}
            </h2>
            <h2 className='flex gap-2 '>
              <Clock className='text-primary' />
              At Time :{item?.attributes?.Time}
            </h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingList
