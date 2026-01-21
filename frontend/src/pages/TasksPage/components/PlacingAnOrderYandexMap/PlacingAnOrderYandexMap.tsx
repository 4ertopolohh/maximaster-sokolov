import { useEffect, useMemo, useRef } from 'react'
import '../PlacingAnOrderYandexMap/PlacingAnOrderYandexMap.scss'

type Coordinates = [number, number]

type YMapsReady = (cb: () => void) => void

type YMapsEvent = {
    get: (key: 'coords') => number[]
}

type YMapsMap = {
    events: {
        add: (eventName: 'click', handler: (e: YMapsEvent) => void) => void
    }
    geoObjects: {
        add: (object: unknown) => void
    }
    setCenter: (center: number[], zoom?: number, options?: unknown) => void
    balloon: {
        open: (coords: number[], content: string) => void
        close: () => void
    }
    destroy: () => void
}

type YMapsPlacemark = {
    geometry: {
        setCoordinates: (coords: number[]) => void
    }
}

type YMapsConstructor = {
    Map: new (containerId: string, options: { center: number[]; zoom: number; controls?: string[] }) => YMapsMap
    Placemark: new (coords: number[], properties?: unknown, options?: unknown) => YMapsPlacemark
    ready: YMapsReady
}

declare global {
    interface Window {
        ymaps?: YMapsConstructor
    }
}

export type PlacingAnOrderYandexMapProps = {
    value: Coordinates | null
    onChange: (coords: Coordinates) => void
    hasError: boolean
}

const PlacingAnOrderYandexMap = ({ value, onChange, hasError }: PlacingAnOrderYandexMapProps) => {
    const containerId = useMemo(() => `placingAnOrderMap_${Math.random().toString(36).slice(2, 10)}`, [])
    const mapRef = useRef<YMapsMap | null>(null)
    const placemarkRef = useRef<YMapsPlacemark | null>(null)
    const latestValueRef = useRef<Coordinates | null>(value)

    useEffect(() => {
        latestValueRef.current = value
    }, [value])

    useEffect(() => {
        const ymaps = window.ymaps

        if (!ymaps) return

        ymaps.ready(() => {
            if (mapRef.current) return

            const initialCenter = latestValueRef.current ?? ([55.76, 37.64] as Coordinates)

            const map = new ymaps.Map(containerId, {
                center: initialCenter,
                zoom: 9,
                controls: [],
            })

            mapRef.current = map

            if (latestValueRef.current) {
                const pm = new ymaps.Placemark(latestValueRef.current)
                placemarkRef.current = pm
                map.geoObjects.add(pm)
            }

            map.events.add('click', (e) => {
                const coordsRaw = e.get('coords')
                const coords: Coordinates = [coordsRaw[0], coordsRaw[1]]

                if (!placemarkRef.current) {
                    const pm = new ymaps.Placemark(coords)
                    placemarkRef.current = pm
                    map.geoObjects.add(pm)
                } else {
                    placemarkRef.current.geometry.setCoordinates(coords)
                }

                map.balloon.open(
                    coords,
                    `Координаты: ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`
                )

                onChange(coords)
            })
        })

        return () => {
            if (mapRef.current) {
                mapRef.current.balloon.close()
                mapRef.current.destroy()
                mapRef.current = null
                placemarkRef.current = null
            }
        }
    }, [containerId, onChange])

    useEffect(() => {
        if (!mapRef.current) return
        if (!value) return

        mapRef.current.setCenter(value, 14)

        if (!placemarkRef.current && window.ymaps) {
            const pm = new window.ymaps.Placemark(value)
            placemarkRef.current = pm
            mapRef.current.geoObjects.add(pm)
            return
        }

        placemarkRef.current?.geometry.setCoordinates(value)
    }, [value])

    return <div id={containerId} className={`placingAnOrderYandexMap${hasError ? ' placingAnOrderYandexMapError' : ''}`} />
}

export default PlacingAnOrderYandexMap
