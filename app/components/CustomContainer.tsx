import React from 'react'

interface Props{
    children:React.ReactNode
}
const CustomContainer = ({children}:Props) => {
  return (
   <div className=' bg-sky-300 w-full min-h-screen '>
{children}
   </div>
  )
}

export default CustomContainer