import Head from 'next/head'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ClerkProvider } from "@clerk/nextjs"
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserProvider } from '../Components/UserContext'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Provider store={store}>
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
              <Component {...pageProps} />
            </UserProvider>
          </ClerkProvider>
        </LocalizationProvider>
      </Provider>
    </>
  )
}