'use client'
import React, { useState } from 'react'
import CustomContainer from '../components/CustomContainer'
import Link from 'next/link'
import LinkWithTransition from '../components/LinkWithTransition'
import NavBar from '../components/NavBar'
import LottieAnimation from '../components/LottieAnimation'

const perfil = () => {
  const [empresa, setEmpresa] = useState({
    nombre:"Empresa 1",
    foto:"foto1.jpg",
    direccion:"Direccion 1"
  })

  const [play, setPlay] = useState(false)

  
  return (
    <CustomContainer>
      
      <div className='w-full flex  py-20'>
 {/* <form className='m-auto flex flex-col gap-2 bg-slate-50 text-slate-900 max-w-[400px] rounded-md p-4'>
        <label htmlFor="" >Empresa: {empresa.nombre}</label>
        <input type="text"  className='outline-none border-1 border-slate-500 p-1 rounded-sm focus:border-green-600'/>
        <label htmlFor="" >Direccion: {empresa.direccion}</label>
        <input type="text"   className='outline-none border-1 border-slate-500 p-1  rounded-sm focus:border-green-600'/>
        <label htmlFor="" >Foto: {empresa.direccion}</label>
        <input type="text"   className='outline-none border-1 border-slate-500 p-1  rounded-sm focus:border-green-600'/>
         <input type="submit"   value={'Enviar'} className='bg-green-600 p-2 rounded-sm cursor-pointer hover:bg-green-800'/>
      </form> */}

      <LinkWithTransition href="/perfil/1">
      <img src="image1.jpg" alt="imagen"  style={{viewTransitionName:'hero-img',aspectRatio:16/9,objectFit:"cover",width:"700px",height:"auto",}}/>
     </LinkWithTransition>

<div>
  <button onClick={()=>setPlay(!play)} className='bg-red-600 w-max'>Play animacion</button>
      <LottieAnimation path='/animations/animation.json' autoplay={play} />
</div>
      </div>

     
     
    </CustomContainer>
  )
}

export default perfil