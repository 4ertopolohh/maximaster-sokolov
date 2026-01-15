import { useMemo, useState } from 'react'
import '../MiniCatalogSectionHeader/MiniCatalogSectionHeader.scss'
import MiniCatalogContent from '../MiniCatalogContent/MiniCatalogContent'
import type { MiniCatalogContentItem } from '../MiniCatalogContent/MiniCatalogContent'

import productIconIphone14 from '../../../../assets/images/pictures/productIconIphone14.png'
import productIconCamera from '../../../../assets/images/pictures/productIconCamera.png'
import productIconAppleWatch from '../../../../assets/images/pictures/productIconAppleWatch.png'
import productIconAirPodsMax from '../../../../assets/images/pictures/productIconAirPodsMax.png'
import productIconGalaxyWatch from '../../../../assets/images/pictures/productIconGalaxyWatch.png'
import productIconFold5 from '../../../../assets/images/pictures/productIconFold5.png'
import productIconGalaxyBuds from '../../../../assets/images/pictures/productIconGalaxyBuds.png'
import productIconIpad from '../../../../assets/images/pictures/productIconIpad.png'

type MiniCatalogTabKey = 'newArrival' | 'bestseller' | 'featured'

const TABS: Array<{ key: MiniCatalogTabKey; label: string }> = [
    { key: 'newArrival', label: 'New Arrival' },
    { key: 'bestseller', label: 'Bestseller' },
    { key: 'featured', label: 'Featured Products' },
]

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

/*
const CATALOG_ITEMS: MiniCatalogItem[] = [
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

const ORDER_BY_TAB: Record<MiniCatalogTabKey, ReadonlyArray<MiniCatalogItemId>> = {
    newArrival: ['iphone14', 'camera6k', 'watch9', 'airpodsmax', 'galaxywatch6', 'fold5', 'galaxybudsfe', 'ipad9'],
    bestseller: ['fold5', 'iphone14', 'camera6k', 'galaxywatch6', 'airpodsmax', 'watch9', 'ipad9', 'galaxybudsfe'],
    featured: ['camera6k', 'airpodsmax', 'iphone14', 'watch9', 'ipad9', 'fold5', 'galaxybudsfe', 'galaxywatch6'],
}
*/

const MiniCatalogSectionHeader = () => {
    const [activeKey, setActiveKey] = useState<MiniCatalogTabKey>('newArrival')

    const items: MiniCatalogContentItem[] = useMemo(() => {
        if (activeKey === 'bestseller') return BESTSELLER_ITEMS
        if (activeKey === 'featured') return FEATURED_ITEMS
        return NEW_ARRIVAL_ITEMS
    }, [activeKey])

    return (
        <div className='miniCatalogSectionHeader'>
            <ul className='miniCatalogHeaderNav'>
                {TABS.map((tab) => (
                    <li key={tab.key} className='miniCatalogNavItem'>
                        <button
                            type='button'
                            className={`miniCatalogNavButton${activeKey === tab.key ? ' isActive' : ''}`}
                            onClick={() => setActiveKey(tab.key)}
                            aria-pressed={activeKey === tab.key}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
            <MiniCatalogContent items={items} />
        </div>
    )
}

export default MiniCatalogSectionHeader
