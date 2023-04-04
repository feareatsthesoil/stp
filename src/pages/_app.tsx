import Head from 'next/head'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'
import Loader from '../Components/Loader'
import { ClerkProvider } from "@clerk/nextjs"
import {useEffect} from 'react'
import axios from 'axios'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserProvider } from '../Components/UserContext'
export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  const router= useRouter()
  Router.events.on("routeChangeStart", () => {
    setLoading(true)
  })
  Router.events.on("routeChangeComplete", () => {
    setLoading(false)
  })
  Router.events.on("routeChangeError", () => {
    setLoading(false)
  })

  useEffect(()=>{
    if(router.asPath=="/contactInfo"){
      return 
    }
    axios.get("/api/directory/meta").then(({data})=>{
      console.log(data.contactInfo)
      if(data.user){
        if(!data.contactInfo){
          console.log("Push ehere")
          router.push("/contactInfo")
        }
      }
    }).catch(()=>{
      
    })
  }, [router.asPath])
  // return <Loader/>
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ClerkProvider {...pageProps}>
          <UserProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
              />
              <title>STP</title>
            </Head>
            {loading && <Loader />}
            <Component {...pageProps} />
          </UserProvider>
        </ClerkProvider>
  </LocalizationProvider>
    </>
  )
}