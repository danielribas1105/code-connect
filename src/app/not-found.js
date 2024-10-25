'use client' // Error components must be Client Components
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { ArrowBack } from '@/components/icons/ArrowBack'
import { Heading } from '@/components/Heading'
import style from './error/error.module.css'
import banner from './error/404.png'

export default function NotFound({ error }) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error)
   }, [error])

   return (
      <div className={style.container}>
         <Image src={banner} />
         <Heading>Opa! Ocorreu um erro.</Heading>
         <p className={style.text}>O post selecionado não existe, volte para seguir navegando.</p>
         <Link href="/">
            Voltar ao feed <ArrowBack color='#81FE88' />
         </Link>
      </div>
   )
}