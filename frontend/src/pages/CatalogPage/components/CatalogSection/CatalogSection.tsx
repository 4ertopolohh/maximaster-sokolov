import { useMemo } from 'react'

import '../CatalogSection/CatalogSection.scss'
import CatalogSectionFilters from '../CatalogSectionFilters/CatalogSectionFilters'
import type { CatalogSectionFilterBlock } from '../CatalogSectionFilters/CatalogSectionFilters'
import CatalogSectionProducts from '../CatalogSectionProducts/CatalogSectionProducts'
import type { CatalogCardProps } from '../../../../components/CatalogCard/CatalogCard'

import { CATALOG_CARDS, CATALOG_PRODUCTS_BY_CATEGORY, type CatalogCategory } from '../../../../shared/products'

/*
import productIconIphone14 from '../../../../assets/images/pictures/productIconIphone14.png'
import productIconIphone14Gold from '../../../../assets/images/pictures/iphone14Gold.png'
import productIconCamera from '../../../../assets/images/pictures/productIconCamera.png'
import productIconAppleWatch from '../../../../assets/images/pictures/productIconAppleWatch.png'
import productIconAirPodsMax from '../../../../assets/images/pictures/productIconAirPodsMax.png'
import productIconGalaxyWatch from '../../../../assets/images/pictures/productIconGalaxyWatch.png'
import productIconFold5 from '../../../../assets/images/pictures/productIconFold5.png'
import productIconGalaxyBuds from '../../../../assets/images/pictures/productIconGalaxyBuds.png'
import productIconIpad from '../../../../assets/images/pictures/productIconIpad.png'
*/

type CatalogSectionProps = {
  selectedCategory?: string
}

const CatalogSection = ({ selectedCategory }: CatalogSectionProps) => {
  const filtersByCategory: Record<string, CatalogSectionFilterBlock[]> = {
    Phones: [
      {
        id: 'brand',
        title: 'Brand',
        items: [
          { id: 'apple', title: 'Apple', count: 110 },
          { id: 'samsung', title: 'Samsung', count: 125 },
          { id: 'xiaomi', title: 'Xiaomi', count: 68 },
          { id: 'poco', title: 'Poco', count: 44 },
          { id: 'oppo', title: 'OPPO', count: 36 },
          { id: 'honor', title: 'Honor', count: 10 },
        ],
      },
      {
        id: 'battery',
        title: 'Battery capacity',
        items: [
          { id: 'battery_3000_3499', title: '3000–3499 mAh', count: 37 },
          { id: 'battery_3500_3999', title: '3500–3999 mAh', count: 52 },
          { id: 'battery_4000_4499', title: '4000–4499 mAh', count: 63 },
          { id: 'battery_5000_plus', title: '5000+ mAh', count: 36 },
        ],
      },
      {
        id: 'screen_type',
        title: 'Screen type',
        items: [
          { id: 'amoled', title: 'AMOLED', count: 74 },
          { id: 'oled', title: 'OLED', count: 28 },
          { id: 'ips', title: 'IPS', count: 86 },
        ],
      },
      {
        id: 'screen_diagonal',
        title: 'Screen diagonal',
        items: [
          { id: 'upto_5_8', title: 'Up to 5.8"', count: 22 },
          { id: '6_1_6_4', title: '6.1"–6.4"', count: 71 },
          { id: '6_7_plus', title: '6.7"+', count: 29 },
        ],
      },
      {
        id: 'protection',
        title: 'Protection class',
        items: [
          { id: 'none', title: 'No protection', count: 97 },
          { id: 'ip67', title: 'IP67', count: 16 },
          { id: 'ip68', title: 'IP68', count: 12 },
        ],
      },
      {
        id: 'memory',
        title: 'Built-in memory',
        items: [
          { id: '64', title: '64 GB', count: 18 },
          { id: '128', title: '128 GB', count: 52 },
          { id: '256', title: '256 GB', count: 41 },
          { id: '512', title: '512 GB', count: 12 },
        ],
      },
    ],

    Cameras: [
      {
        id: 'brand',
        title: 'Brand',
        items: [
          { id: 'canon', title: 'Canon', count: 42 },
          { id: 'nikon', title: 'Nikon', count: 35 },
          { id: 'sony', title: 'Sony', count: 28 },
        ],
      },
      {
        id: 'camera_type',
        title: 'Camera type',
        items: [
          { id: 'dslr', title: 'DSLR', count: 31 },
          { id: 'mirrorless', title: 'Mirrorless', count: 48 },
          { id: 'compact', title: 'Compact', count: 19 },
        ],
      },
      {
        id: 'resolution',
        title: 'Resolution',
        items: [
          { id: '20mp', title: 'Up to 20 MP', count: 22 },
          { id: '24mp', title: '24 MP', count: 37 },
          { id: '30mp_plus', title: '30+ MP', count: 18 },
        ],
      },
    ],

    Headphones: [
      {
        id: 'type',
        title: 'Type',
        items: [
          { id: 'overear', title: 'Over-ear', count: 44 },
          { id: 'onear', title: 'On-ear', count: 31 },
          { id: 'inear', title: 'In-ear', count: 58 },
        ],
      },
      {
        id: 'connection',
        title: 'Connection',
        items: [
          { id: 'wired', title: 'Wired', count: 47 },
          { id: 'wireless', title: 'Wireless', count: 62 },
        ],
      },
      {
        id: 'noise_cancel',
        title: 'Noise cancelling',
        items: [
          { id: 'yes', title: 'Yes', count: 39 },
          { id: 'no', title: 'No', count: 54 },
        ],
      },
    ],

    Computers: [
      {
        id: 'brand',
        title: 'Brand',
        items: [
          { id: 'apple', title: 'Apple', count: 21 },
          { id: 'asus', title: 'ASUS', count: 34 },
          { id: 'lenovo', title: 'Lenovo', count: 29 },
        ],
      },
      {
        id: 'type',
        title: 'Type',
        items: [
          { id: 'laptop', title: 'Laptop', count: 58 },
          { id: 'desktop', title: 'Desktop', count: 26 },
        ],
      },
      {
        id: 'processor',
        title: 'Processor',
        items: [
          { id: 'intel', title: 'Intel', count: 44 },
          { id: 'amd', title: 'AMD', count: 31 },
          { id: 'apple_silicon', title: 'Apple Silicon', count: 19 },
        ],
      },
    ],

    Gaming: [
      {
        id: 'platform',
        title: 'Platform',
        items: [
          { id: 'pc', title: 'PC', count: 41 },
          { id: 'playstation', title: 'PlayStation', count: 22 },
          { id: 'xbox', title: 'Xbox', count: 18 },
        ],
      },
      {
        id: 'genre',
        title: 'Genre',
        items: [
          { id: 'action', title: 'Action', count: 36 },
          { id: 'rpg', title: 'RPG', count: 28 },
          { id: 'sports', title: 'Sports', count: 19 },
        ],
      },
    ],

    'Smart Watches': [
      {
        id: 'brand',
        title: 'Brand',
        items: [
          { id: 'apple', title: 'Apple', count: 39 },
          { id: 'samsung', title: 'Samsung', count: 27 },
          { id: 'garmin', title: 'Garmin', count: 18 },
        ],
      },
      {
        id: 'display',
        title: 'Display',
        items: [
          { id: 'amoled', title: 'AMOLED', count: 41 },
          { id: 'oled', title: 'OLED', count: 23 },
          { id: 'lcd', title: 'LCD', count: 17 },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        items: [
          { id: 'gps', title: 'GPS', count: 34 },
          { id: 'waterproof', title: 'Waterproof', count: 29 },
          { id: 'heart_rate', title: 'Heart rate sensor', count: 46 },
        ],
      },
    ],
  }

  /*
  const productsByCategory: Record<string, CatalogCardProps[]> = {
      Phones: [
          { id: 'iphone14', title: 'Apple iPhone 14 Pro Max 128GB Deep Purple ', productIcon: productIconIphone14, price: '900' },
          { id: 'fold5', title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black', productIcon: productIconFold5, price: '1799' },
          { id: 'iphone14Gold', title: 'Apple iPhone 14 Pro Max 128GB Gold ', productIcon: productIconIphone14Gold, price: '949' },
      ],
      Cameras: [
          { id: 'camera6k', title: 'Blackmagic Pocket Cinema Camera 6k', productIcon: productIconCamera, price: '2535' }
      ],
      'Smart Watches': [
          { id: 'watch9', title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium ', productIcon: productIconAppleWatch, price: '300' },
          { id: 'galaxywatch6', title: 'Samsung Galaxy Watch6 Classic 47mm Black', productIcon: productIconGalaxyWatch, price: '369' }
      ],
      Headphones: [
          { id: 'airpodsmax', title: 'AirPods Max Silver Starlight Aluminium ', productIcon: productIconAirPodsMax, price: '549' },
          { id: 'galaxybudsfe', title: 'Galaxy Buds FE Graphite', productIcon: productIconGalaxyBuds, price: '99.99' }
      ],
      Computers: [
          { id: 'ipad9', title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021', productIcon: productIconIpad, price: '398' }
      ]
  }
  */

  const productsByCategory = useMemo<Record<string, CatalogCardProps[]>>(() => {
    const categories = Object.keys(CATALOG_PRODUCTS_BY_CATEGORY) as CatalogCategory[]
    return categories.reduce<Record<string, CatalogCardProps[]>>((acc, category) => {
      const ids = CATALOG_PRODUCTS_BY_CATEGORY[category]
      const items: CatalogCardProps[] = ids
        .map<CatalogCardProps | null>((cardId) => {
          const card = CATALOG_CARDS[cardId]
          if (!card) return null
          return {
            id: card.id,
            title: card.title,
            productIcon: card.productIcon,
            price: card.price,
            productId: card.productId,
            preferredColor: card.preferredColor,
          }
        })
        .filter((v): v is CatalogCardProps => v !== null)

      acc[category] = items
      return acc
    }, {})
  }, [])

  const allFilters = useMemo<CatalogSectionFilterBlock[]>(() => {
    const entries = Object.entries(filtersByCategory)

    return entries.flatMap(([category, blocks]) =>
      blocks.map((block) => ({
        ...block,
        id: `${category}_${block.id}`,
        title: `${category}: ${block.title}`,
      })),
    )
  }, [filtersByCategory])

  const allProducts = useMemo<CatalogCardProps[]>(() => {
    return Object.values(productsByCategory).flatMap((list) => list)
  }, [productsByCategory])

  const resolvedCategory = selectedCategory && selectedCategory in filtersByCategory ? selectedCategory : 'All'

  const filters = resolvedCategory === 'All' ? allFilters : filtersByCategory[resolvedCategory]

  const products = resolvedCategory === 'All' ? allProducts : productsByCategory[resolvedCategory] || []

  return (
    <section className="catalogSection">
      <div className="container">
        <CatalogSectionFilters filters={filters} />
        <CatalogSectionProducts items={products} />
      </div>
    </section>
  )
}

export default CatalogSection
