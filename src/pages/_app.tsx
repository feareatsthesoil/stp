import Head from 'next/head'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { useState } from 'react'
import Loader from '../Components/Loader'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  Router.events.on("routeChangeStart", () => {
    setLoading(true)
  })
  Router.events.on("routeChangeComplete", () => {
    setLoading(false)
  })
  Router.events.on("routeChangeError", () => {
    setLoading(false)
  })
  // return <Loader/>
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title>STP</title>
      </Head>
      {loading && <Loader />}
      <Component {...pageProps} />
    </>
  )
}