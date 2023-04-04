import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

import { DirectoryRow } from "../../types";
export const UserContext = createContext<{profile? : DirectoryRow, userId?: string, loggedIn?: boolean, initialized: boolean, refresh : ()=>any}>({initialized: false, refresh: ()=>{}})

export const UserProvider = (props: {children: ReactNode})=>{
    const [profile, setProfile] = useState<DirectoryRow>()
    const [userId, setUserId] = useState<string>()
    const [loggedIn, setLoggedIn] = useState<boolean>()
    const [initialized, setInitialized] = useState(false)
    const auth = useAuth()

    const loadData = ()=> axios.get("/api/directory/meta").then(({data})=>{
        console.log(data.contactInfo)
        
       
            setUserId(data.user)
            setProfile(data.contactInfo)
            setLoggedIn(!!data.user)
     
        
      }).catch(()=>{
        setUserId(undefined)
        setProfile(undefined)
        setLoggedIn(false)
        
      }).then(()=>{
        setInitialized(true)
      })
    useEffect(()=>{
        setInitialized(false)
        setLoggedIn(false)
        setUserId(undefined)
        setProfile(undefined)
       loadData()
       
    }, [auth.isSignedIn])
    useEffect(()=>{
       
    }, [])
    const refresh = ()=>{
       return  loadData()
    }
    return <UserContext.Provider value={{initialized, profile, userId, loggedIn, refresh}}>
        {props.children}
    </UserContext.Provider>
}