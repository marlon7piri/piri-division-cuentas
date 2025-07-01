import { useRouter } from 'next/navigation'
import React from 'react'

const LinkWithTransition = ({href,children}:{href:string,children:React.ReactNode}) => {

    const router = useRouter()

    const handlerClick = (e:React.MouseEvent)=>{
        e.preventDefault()

        if(document.startViewTransition){
            document.startViewTransition(()=>{
                router.push(href)
            })
        }else{
            router.push(href)
        }
    }
  return <a href={href} onClick={handlerClick}> {children}</a>
}

export default LinkWithTransition