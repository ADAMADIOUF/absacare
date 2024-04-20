"use client"
import React,{useState,useEffect} from 'react'
import {CalendarDays,Clock } from 'lucide-react'
import {
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'

import { Button } from '@/components/ui/button'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'

const BookAppointment = ({doctor}) => {
 const [date, setDate] = useState( new Date())
 const [timeSlot, setTimeSlot] = useState()
 const [selectTimeSlot, setSelectTimeSlot] = useState()
 const[note,setNote]= useState()
const { user } = useKindeBrowserClient()

 useEffect(()=>{
  getTime()
 },[])
const getTime = ()=>{
 
 const timeList=[];
 for(let i =9;i<=12;i++){
  timeList.push({
   time:i +":00 AM"
  })
  timeList.push({
    time: i + ':30 AM',
  })
 }
 for (let i = 1; i <= 5; i++) {
   timeList.push({
     time: i + ':00 PM',
   })
   timeList.push({
     time: i + ':30 PM',
   })
 }
 setTimeSlot(timeList)
}
const saveBooking =()=>{
 const data ={
  data:{
   UserName:user.given_name+" "+user.family_name,
   Email:user.email,
   Time:selectTimeSlot,
   Date:date,
   doctor:doctor.id,
   Note:note
  }
 }
 GlobalApi.bookAppointment(data)
   .then((resp) => {
   
     if (resp) {
      GlobalApi.sendEmail(data).then((resp)=>{
       console.log(resp);
      })
       toast('Booking Confirmation sent on Email')
     }
   })
   .catch((error) => {
     console.error('Error booking appointment:', error)
     // Optionally, show an error message toast here
   })

}
const isPastDay =(day)=>{
 return day<new Date()
}
  return (
    <Dialog>
      <DialogTrigger>
        <Button className='mt-3 rounded-full'>Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div className='grid gap-3  md:grid-cols-2 mt-5'>
              <div className='   gap-5'>
                <h2 className=' flex gap-2 items-center'>
                  <CalendarDays className=' text-primary h-5 w-5' />
                  Select Date
                </h2>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay}
                  className='rounded-md border bg-white'
                />
              </div>
              <div className='mt-3 md:mt-0'>
                <h2 className='flex gap-2 items-center mb-3'>
                  {' '}
                  <Clock className='text-primary h-5 w-5' /> Select Time Slot
                </h2>
                <div className='grid grid-cols-3 gap-2 border rounded-lg p-3'>
                  {timeSlot?.map((item, index) => (
                    <h2
                      onClick={() => setSelectTimeSlot(item.time)}
                      className={`p-2 border rounded-full text-center hover:bg-primary hover:text-white cursor-pointer ${
                        item.time == selectTimeSlot && 'bg-primary text-white'
                      }`}
                      key={index}
                    >
                      {item.time}
                    </h2>
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder='Note'
          value={note} // Set the value of the textarea
          onChange={(e) => setNote(e.target.value)} // Update the note state when the user types
        />
        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <>
              <Button
                type='button'
                variant='outline'
                className='text-red-500 border-red-500'
              >
                Close
              </Button>
              <Button
                type='button'
                disabled={!(date && selectTimeSlot)}
                onClick={() => saveBooking()}
              >
                Submit
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment
