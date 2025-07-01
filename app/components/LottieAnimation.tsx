import Lottie from 'lottie-web'
import React, { useEffect, useRef } from 'react'


interface Props{
    path:string
    width?:number
    height?:number
    loop?:boolean
    autoplay?:boolean
}
const LottieAnimation = ({path,width=300,height=300,loop=true,autoplay=true}:Props) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(containerRef.current){
            const anim = Lottie.loadAnimation({
                container:containerRef.current,
                loop,
                autoplay,
                path,
                renderer:'svg'
            })

            return ()=>anim.destroy()
        }

    },[path,loop,autoplay])
  return (
    <div ref={containerRef} style={{width,height}}/>
  )
}

export default LottieAnimation