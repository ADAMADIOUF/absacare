"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [doctorList, setDoctorList] = useState([])
  useEffect(() => {
   getDoctorList()
  }, [])
  const getDoctorList = () => {
    GlobalApi.getDoctorList()
      .then((resp) => {
        console.log(resp.data.data)
        setDoctorList(resp.data.data)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
        setError('Failed to fetch categories. Please try again later.')
      })
  }
  return (
    <div>
     <Hero/>
     <CategorySearch/>
     <DoctorList doctorList={doctorList}/>
    </div>
  )
}
