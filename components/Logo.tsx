import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logos from '../public/Logo.png'
type Props = {}

function Logo(props: any) {
  const {renderDefault, title} = props

  return (
    <div>
      <Link href={'https://emrani.co.uk'} prefetch={false}>
        <Image src={Logos} height={40} width={100} alt="logo"></Image>
      </Link>
    </div>
  )
}

export default Logo
