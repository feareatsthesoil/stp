import { useEffect, useRef } from "react"
import css from "./CalendarEvent.module.css"

export default function Map({ address }: { address: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function effect() {
            if (ref.current) {
                try {
                    const geocoder = new window.google.maps.Geocoder()
                    const response = await geocoder.geocode({ address })
                    const result = response.results[0]

                    if (result) {
                        const [lat, lng] = [result.geometry.location.lat(), result.geometry.location.lng()]
                        const map = new window.google.maps.Map(ref.current, { center: { lat, lng }, zoomControl: true, fullscreenControl: true, scaleControl: true, zoom: 10, })

                        new window.google.maps.Marker({ map, position: { lat, lng } })
                    }
                } catch (ex) {
                }
            }
        }
        effect()
    }, [ref])
    return <div className={css.map} ref={ref} id="map">

    </div>
}