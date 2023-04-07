import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { eventsByIdSelector, eventsSelector, loadEvents } from "./slices/calendar"
import { AppDispatch } from "./store"

export const useEvents = ()=>{
    const dispatch :AppDispatch = useDispatch()
 
    useEffect(()=>{
     
      dispatch(loadEvents())
      const interval = setInterval(()=> dispatch(loadEvents()), 3000)
      return ()=>{
        clearInterval(interval)
      }
  
    },[])
    return useSelector(eventsSelector)
}


export const useEvent = (id: string)=>{
  const dispatch: AppDispatch = useDispatch()

  const event = useSelector(eventsByIdSelector(id))
  useEffect(()=>{
    if(!event)
      dispatch(loadEvents())
   

  },[])
  return event
}