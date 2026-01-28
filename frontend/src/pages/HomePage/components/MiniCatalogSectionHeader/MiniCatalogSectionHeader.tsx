import { useEffect, useMemo, useState } from 'react'
import '../MiniCatalogSectionHeader/MiniCatalogSectionHeader.scss'
import MiniCatalogContent from '../MiniCatalogContent/MiniCatalogContent'
import type { MiniCatalogContentItem } from '../MiniCatalogContent/MiniCatalogContent'

type MiniCatalogTabKey = 'newArrival' | 'bestseller' | 'featured'

const TABS: Array<{ key: MiniCatalogTabKey; label: string }> = [
    { key: 'newArrival', label: 'New Arrival' },
    { key: 'bestseller', label: 'Bestseller' },
    { key: 'featured', label: 'Featured Products' },
]

type MiniCatalogApiItem = {
    id: string
    title: string
    productIcon: string
    price: string
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null

const isMiniCatalogApiItem = (v: unknown): v is MiniCatalogApiItem => {
    if (!isRecord(v)) return false
    return (
        typeof v.id === 'string' &&
        typeof v.title === 'string' &&
        typeof v.productIcon === 'string' &&
        typeof v.price === 'string'
    )
}

const isMiniCatalogApiItemArray = (v: unknown): v is MiniCatalogApiItem[] =>
    Array.isArray(v) && v.every(isMiniCatalogApiItem)

const parsePrice = (value: string): number => {
    const normalized = value.replace(',', '.').replace(/[^\d.]/g, '')
    const n = Number(normalized)
    return Number.isFinite(n) ? n : 0
}

const fetchMiniCatalogItems = async (signal: AbortSignal): Promise<MiniCatalogApiItem[]> => {
    const res = await fetch('/api/products/', { signal })
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }

    const data: unknown = await res.json()
    if (!isMiniCatalogApiItemArray(data)) {
        throw new Error('Invalid API response shape for /api/products/')
    }

    return data
}

const MiniCatalogSectionHeader = () => {
    const [activeKey, setActiveKey] = useState<MiniCatalogTabKey>('newArrival')
    const [allItems, setAllItems] = useState<MiniCatalogContentItem[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        const load = async () => {
            setError(null)
            try {
                const data = await fetchMiniCatalogItems(controller.signal)
                const mapped: MiniCatalogContentItem[] = data.map((it) => ({
                    id: it.id,
                    title: it.title,
                    productIcon: it.productIcon,
                    price: it.price,
                }))
                setAllItems(mapped)
            } catch (e: unknown) {
                if (e instanceof DOMException && e.name === 'AbortError') return
                const message = e instanceof Error ? e.message : 'Unknown error'
                setError(message)
                setAllItems([])
            }
        }

        void load()

        return () => {
            controller.abort()
        }
    }, [])

    const itemsByTab = useMemo<Record<MiniCatalogTabKey, MiniCatalogContentItem[]>>(() => {
        const maxItems = 8
        const base = allItems

        const newArrival = base.slice(0, maxItems)

        const bestseller = [...base]
            .sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
            .slice(0, maxItems)

        const featured = [...base]
            .sort((a, b) => a.title.localeCompare(b.title))
            .slice(0, maxItems)

        return { newArrival, bestseller, featured }
    }, [allItems])

    const items: MiniCatalogContentItem[] = itemsByTab[activeKey]

    return (
        <div className="miniCatalogSectionHeader">
            <ul className="miniCatalogHeaderNav">
                {TABS.map((tab) => (
                    <li key={tab.key} className="miniCatalogNavItem">
                        <button
                            type="button"
                            className={`miniCatalogNavButton${activeKey === tab.key ? ' isActive' : ''}`}
                            onClick={() => setActiveKey(tab.key)}
                            aria-pressed={activeKey === tab.key}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>

            {error ? <p className="miniCatalogError">{error}</p> : null}

            <MiniCatalogContent items={items} />
        </div>
    )
}

export default MiniCatalogSectionHeader

/*
import productIconIphone14 from '../../../../assets/images/pictures/productIconIphone14.png'
import productIconCamera from '../../../../assets/images/pictures/productIconCamera.png'
import productIconAppleWatch from '../../../../assets/images/pictures/productIconAppleWatch.png'
import productIconAirPodsMax from '../../../../assets/images/pictures/productIconAirPodsMax.png'
import productIconGalaxyWatch from '../../../../assets/images/pictures/productIconGalaxyWatch.png'
import productIconFold5 from '../../../../assets/images/pictures/productIconFold5.png'
import productIconGalaxyBuds from '../../../../assets/images/pictures/productIconGalaxyBuds.png'
import productIconIpad from '../../../../assets/images/pictures/productIconIpad.png'

type MiniCatalogItemId =
  | 'iphone14'
  | 'camera6k'
  | 'watch9'
  | 'airpodsmax'
  | 'galaxywatch6'
  | 'fold5'
  | 'galaxybudsfe'
  | 'ipad9'

type MiniCatalogItem = MiniCatalogContentItem & {
  id: MiniCatalogItemId
}

const NEW_ARRIVAL_ITEMS: MiniCatalogItem[] = [
  {
    id: 'iphone14',
    title: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
    productIcon: productIconIphone14,
    price: '900',
  },
  {
    id: 'camera6k',
    title: 'Blackmagic Pocket Cinema Camera 6k',
    productIcon: productIconCamera,
    price: '2535',
  },
  {
    id: 'watch9',
    title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium ',
    productIcon: productIconAppleWatch,
    price: '300',
  },
  {
    id: 'airpodsmax',
    title: 'AirPods Max Silver Starlight Aluminium ',
    productIcon: productIconAirPodsMax,
    price: '549',
  },
  {
    id: 'galaxywatch6',
    title: 'Samsung Galaxy Watch6 Classic 47mm Black',
    productIcon: productIconGalaxyWatch,
    price: '369',
  },
  {
    id: 'fold5',
    title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
    productIcon: productIconFold5,
    price: '1799',
  },
  {
    id: 'galaxybudsfe',
    title: 'Galaxy Buds FE Graphite',
    productIcon: productIconGalaxyBuds,
    price: '99.99',
  },
  {
    id: 'ipad9',
    title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    productIcon: productIconIpad,
    price: '398',
  },
]

const BESTSELLER_ITEMS: MiniCatalogItem[] = [
  {
    id: 'fold5',
    title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
    productIcon: productIconFold5,
    price: '1799',
  },
  {
    id: 'iphone14',
    title: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
    productIcon: productIconIphone14,
    price: '900',
  },
  {
    id: 'camera6k',
    title: 'Blackmagic Pocket Cinema Camera 6k',
    productIcon: productIconCamera,
    price: '2535',
  },
  {
    id: 'galaxywatch6',
    title: 'Samsung Galaxy Watch6 Classic 47mm Black',
    productIcon: productIconGalaxyWatch,
    price: '369',
  },
  {
    id: 'airpodsmax',
    title: 'AirPods Max Silver Starlight Aluminium ',
    productIcon: productIconAirPodsMax,
    price: '549',
  },
  {
    id: 'watch9',
    title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium ',
    productIcon: productIconAppleWatch,
    price: '300',
  },
  {
    id: 'ipad9',
    title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    productIcon: productIconIpad,
    price: '398',
  },
  {
    id: 'galaxybudsfe',
    title: 'Galaxy Buds FE Graphite',
    productIcon: productIconGalaxyBuds,
    price: '99.99',
  },
]

const FEATURED_ITEMS: MiniCatalogItem[] = [
  {
    id: 'camera6k',
    title: 'Blackmagic Pocket Cinema Camera 6k',
    productIcon: productIconCamera,
    price: '2535',
  },
  {
    id: 'airpodsmax',
    title: 'AirPods Max Silver Starlight Aluminium ',
    productIcon: productIconAirPodsMax,
    price: '549',
  },
  {
    id: 'iphone14',
    title: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
    productIcon: productIconIphone14,
    price: '900',
  },
  {
    id: 'watch9',
    title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium ',
    productIcon: productIconAppleWatch,
    price: '300',
  },
  {
    id: 'ipad9',
    title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    productIcon: productIconIpad,
    price: '398',
  },
  {
    id: 'fold5',
    title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
    productIcon: productIconFold5,
    price: '1799',
  },
  {
    id: 'galaxybudsfe',
    title: 'Galaxy Buds FE Graphite',
    productIcon: productIconGalaxyBuds,
    price: '99.99',
  },
  {
    id: 'galaxywatch6',
    title: 'Samsung Galaxy Watch6 Classic 47mm Black',
    productIcon: productIconGalaxyWatch,
    price: '369',
  },
]
*/
