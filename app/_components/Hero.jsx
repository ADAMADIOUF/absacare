import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16'>
          <div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full'>
            <Image
              alt=''
              src={`/hero1.png`}
              width={800}
              height={800}
              className='absolute inset-0 h-full w-full object-cover rounded-3xl'
            />
          </div>

          <div className='lg:py-24'>
            <h2 className='text-3xl font-bold sm:text-4xl'>
              Book <span className='text-primary'>Your Appointment</span> Today with Ease!
            </h2>

            <p className='mt-4 text-gray-600'>
              Welcome to AbsaCare, your comprehensive solution for booking
              medical appointments hassle-free. With AbsaCare, you can easily
              schedule appointments with trusted healthcare professionals in
              Senegal. Our user-friendly platform allows you to browse through a
              wide range of doctors, specialists, and medical facilities,
              empowering you to find the right healthcare provider for your
              needs. Say goodbye to long wait times and tedious phone calls –
              AbsaCare streamlines the appointment booking process, ensuring
              that you can access quality healthcare services with just a few
              clicks. Take control of your health journey today with AbsaCare.
            </p>

            <Button className='mt-10'>Book Appointment Now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
