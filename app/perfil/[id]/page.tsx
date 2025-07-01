'use client'
import CustomContainer from '@/app/components/CustomContainer'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

  const router = useRouter()
  return (
    <CustomContainer>
      <button onClick={()=>router.back()}>back</button>
         <img src="/image1.jpg" alt="imagen" 
         style={{viewTransitionName:'hero-img',aspectRatio:16/9,objectFit:"cover",width:"700px",height:"auto"}}/>
    </CustomContainer>
  )
}

export default page