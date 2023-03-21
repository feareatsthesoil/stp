import { useEffect, useRef } from "react"

export default function Map({address}: {address: string}){
    const ref= useRef<HTMLDivElement>(null);
    useEffect(()=>{
        async function effect (){
            if(ref.current){
                const geocoder = new window.google.maps.Geocoder()
                const response = await geocoder.geocode({address})
                const result = response.results[0]
                
                if(result){
                    const [lat, lng] = [result.geometry.location.lat(), result.geometry.location.lng()]
                    const map =new window.google.maps.Map(ref.current,{center:  {lat,lng}, zoomControl: true,fullscreenControl: true,scaleControl: true, zoom: 10,})
                    
                    new window.google.maps.Marker({map, icon:"/icons/location-pin.png",  position: {lat,lng}})
                }
       
            
            
            }
        }
        effect()
       
    }, [ref])

    return <div style={{width: "1000px", height: "500px"}}ref={ref} id="map">

    </div>
}