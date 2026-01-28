import { useEffect, useMemo, useState } from 'react'
import CatalogCard from '../../../../components/CatalogCard/CatalogCard'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import '../DiscountSection/DiscountSection.scss'

// import iphone14Gold from '../../../../assets/images/pictures/iphone14Gold.png'
// import productIconIphone14 from '../../../../assets/images/pictures/productIconIphone14.png'
// import productIconAirPodsMax from '../../../../assets/images/pictures/productIconAirPodsMax.png'
// import productIconAppleWatch from '../../../../assets/images/pictures/productIconAppleWatch.png'

type DiscountApiItem = {
    id: string
    title: string
    productIcon: string
    price: string
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null

const isDiscountApiItem = (v: unknown): v is DiscountApiItem => {
    if (!isRecord(v)) return false
    return (
        typeof v.id === 'string' &&
        typeof v.title === 'string' &&
        typeof v.productIcon === 'string' &&
        typeof v.price === 'string'
    )
}

const isDiscountApiItemArray = (v: unknown): v is DiscountApiItem[] =>
    Array.isArray(v) && v.every(isDiscountApiItem)

const fetchDiscountItems = async (signal: AbortSignal): Promise<DiscountApiItem[]> => {
    const res = await fetch('/api/products/', { signal })
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }

    const data: unknown = await res.json()
    if (!isDiscountApiItemArray(data)) {
        throw new Error('Invalid API response shape for /api/products/')
    }

    return data
}

const pickRandomUnique = <T,>(source: ReadonlyArray<T>, maxCount: number): T[] => {
    const arr = [...source]
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    return arr.slice(0, Math.max(0, Math.min(maxCount, arr.length)))
}

const DiscountSection = () => {
    const [items, setItems] = useState<DiscountApiItem[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        const load = async () => {
            setError(null)
            try {
                const data = await fetchDiscountItems(controller.signal)
                const selected = pickRandomUnique<DiscountApiItem>(data, 4)
                setItems(selected)
            } catch (e: unknown) {
                if (e instanceof DOMException && e.name === 'AbortError') return
                const message = e instanceof Error ? e.message : 'Unknown error'
                setError(message)
                setItems([])
            }
        }

        void load()

        return () => {
            controller.abort()
        }
    }, [])

    const content = useMemo(() => items, [items])

    return (
        <section className="discountSection">
            <div className="container">
                <SectionTitle title="Discounts up to -50%" />

                {error ? <p className="discountSectionError">{error}</p> : null}

                <div className="discountSectionContent">
                    {content.map((item) => (
                        <CatalogCard
                            key={item.id}
                            id={item.id}
                            productIcon={item.productIcon}
                            title={item.title}
                            price={item.price}
                        />
                    ))}

                    {/*
          <CatalogCard
            id=""
            productIcon={iphone14Gold}
            title="Apple iPhone 14 Pro 512GB Gold (MQ233)"
            price="1437"
          />
          <CatalogCard
            id=""
            productIcon={productIconAirPodsMax}
            title="AirPods Max Silver Starlight Aluminium "
            price="549"
          />
          <CatalogCard
            id=""
            productIcon={productIconAppleWatch}
            title="Apple Watch Series 9 GPS 41mm Starlight Aluminium "
            price="399"
          />
          <CatalogCard
            id=""
            productIcon={productIconIphone14}
            title="Apple iPhone 14 Pro 1TB Gold (MQ2V3)"
            price="1499"
          />
          */}
                </div>
            </div>
        </section>
    )
}

export default DiscountSection
