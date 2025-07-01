import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <ul className='flex justify-center items-center gap-10'>
        <Link href={'/'}>Home</Link>
        <Link href={'/perfil'}>Perfil</Link>
    </ul>
  )
}

export default NavBar