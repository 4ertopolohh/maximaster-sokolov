import { useEffect, useMemo, useState } from 'react'
import '../CatalogSection/CatalogSection.scss'
import CatalogSectionFilters from '../CatalogSectionFilters/CatalogSectionFilters'
import type { CatalogSectionFilterBlock } from '../CatalogSectionFilters/CatalogSectionFilters'
import CatalogSectionProducts from '../CatalogSectionProducts/CatalogSectionProducts'
import type { CatalogCardProps } from '../../../../components/CatalogCard/CatalogCard'
import { getProducts, type ProductListItem } from '../../../../shared/api/productsApi'

type CatalogSectionProps = {
  selectedCategory?: string
  selectedCategoryId?: string
  selectedCategoryTitle?: string
}

const CatalogSection = ({ selectedCategory, selectedCategoryId, selectedCategoryTitle }: CatalogSectionProps) => {
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
          { id: 'google', title: 'Google', count: 18 },
          { id: 'oneplus', title: 'OnePlus', count: 22 },
        ],
      },
      {
        id: 'price',
        title: 'Price',
        items: [
          { id: 'p_0_199', title: '$0–$199', count: 34 },
          { id: 'p_200_399', title: '$200–$399', count: 57 },
          { id: 'p_400_699', title: '$400–$699', count: 66 },
          { id: 'p_700_999', title: '$700–$999', count: 48 },
          { id: 'p_1000_plus', title: '$1000+', count: 31 },
        ],
      },
      {
        id: 'storage',
        title: 'Storage',
        items: [
          { id: 's_64', title: '64 GB', count: 28 },
          { id: 's_128', title: '128 GB', count: 72 },
          { id: 's_256', title: '256 GB', count: 64 },
          { id: 's_512', title: '512 GB', count: 22 },
          { id: 's_1tb', title: '1 TB', count: 8 },
        ],
      },
      {
        id: 'ram',
        title: 'RAM',
        items: [
          { id: 'r_4', title: '4 GB', count: 19 },
          { id: 'r_6', title: '6 GB', count: 41 },
          { id: 'r_8', title: '8 GB', count: 63 },
          { id: 'r_12', title: '12 GB', count: 28 },
          { id: 'r_16', title: '16 GB', count: 10 },
        ],
      },
      {
        id: 'screen_size',
        title: 'Screen size',
        items: [
          { id: 'ss_5_5_6_0', title: '5.5"–6.0"', count: 21 },
          { id: 'ss_6_0_6_4', title: '6.0"–6.4"', count: 69 },
          { id: 'ss_6_4_6_7', title: '6.4"–6.7"', count: 83 },
          { id: 'ss_6_7_plus', title: '6.7"+', count: 37 },
        ],
      },
      {
        id: 'refresh_rate',
        title: 'Refresh rate',
        items: [
          { id: 'rr_60', title: '60 Hz', count: 48 },
          { id: 'rr_90', title: '90 Hz', count: 36 },
          { id: 'rr_120', title: '120 Hz', count: 92 },
          { id: 'rr_144', title: '144 Hz', count: 12 },
        ],
      },
      {
        id: 'connectivity',
        title: 'Connectivity',
        items: [
          { id: 'c_5g', title: '5G', count: 151 },
          { id: 'c_esim', title: 'eSIM', count: 86 },
          { id: 'c_dualsim', title: 'Dual SIM', count: 104 },
          { id: 'c_nfc', title: 'NFC', count: 139 },
        ],
      },
      {
        id: 'camera',
        title: 'Camera',
        items: [
          { id: 'cam_12_24', title: '12–24 MP', count: 33 },
          { id: 'cam_48', title: '48 MP', count: 58 },
          { id: 'cam_50', title: '50 MP', count: 71 },
          { id: 'cam_108_plus', title: '108 MP+', count: 29 },
          { id: 'cam_tele', title: 'Telephoto', count: 44 },
          { id: 'cam_ultra', title: 'Ultra-wide', count: 88 },
        ],
      },
      {
        id: 'battery',
        title: 'Battery',
        items: [
          { id: 'b_3000_3999', title: '3000–3999 mAh', count: 26 },
          { id: 'b_4000_4499', title: '4000–4499 mAh', count: 52 },
          { id: 'b_4500_4999', title: '4500–4999 mAh', count: 81 },
          { id: 'b_5000_plus', title: '5000+ mAh', count: 63 },
        ],
      },
      {
        id: 'charging',
        title: 'Charging',
        items: [
          { id: 'ch_20_30', title: '20–30 W', count: 44 },
          { id: 'ch_33_45', title: '33–45 W', count: 52 },
          { id: 'ch_50_80', title: '50–80 W', count: 39 },
          { id: 'ch_100_plus', title: '100+ W', count: 9 },
          { id: 'ch_wireless', title: 'Wireless charging', count: 62 },
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
          { id: 'panasonic', title: 'Panasonic', count: 19 },
          { id: 'fujifilm', title: 'Fujifilm', count: 22 },
          { id: 'blackmagic', title: 'Blackmagic', count: 9 },
        ],
      },
      {
        id: 'camera_type',
        title: 'Camera type',
        items: [
          { id: 'ct_mirrorless', title: 'Mirrorless', count: 67 },
          { id: 'ct_dslr', title: 'DSLR', count: 31 },
          { id: 'ct_cinema', title: 'Cinema', count: 12 },
          { id: 'ct_action', title: 'Action', count: 18 },
        ],
      },
      {
        id: 'sensor',
        title: 'Sensor size',
        items: [
          { id: 's_fullframe', title: 'Full Frame', count: 34 },
          { id: 's_aps_c', title: 'APS-C', count: 41 },
          { id: 's_mft', title: 'Micro 4/3', count: 19 },
          { id: 's_1inch', title: '1-inch', count: 14 },
        ],
      },
      {
        id: 'resolution',
        title: 'Resolution',
        items: [
          { id: 'res_12_20', title: '12–20 MP', count: 22 },
          { id: 'res_24_33', title: '24–33 MP', count: 48 },
          { id: 'res_36_plus', title: '36 MP+', count: 18 },
        ],
      },
      {
        id: 'video',
        title: 'Video',
        items: [
          { id: 'v_4k', title: '4K', count: 64 },
          { id: 'v_6k', title: '6K', count: 14 },
          { id: 'v_8k', title: '8K', count: 9 },
          { id: 'v_60fps', title: '60 fps+', count: 39 },
          { id: 'v_log', title: 'Log profiles', count: 21 },
        ],
      },
      {
        id: 'stabilization',
        title: 'Stabilization',
        items: [
          { id: 'st_ibis', title: 'IBIS', count: 37 },
          { id: 'st_eis', title: 'Electronic', count: 23 },
          { id: 'st_none', title: 'No stabilization', count: 29 },
        ],
      },
      {
        id: 'mount',
        title: 'Lens mount',
        items: [
          { id: 'm_rf', title: 'Canon RF', count: 16 },
          { id: 'm_ef', title: 'Canon EF', count: 19 },
          { id: 'm_e', title: 'Sony E', count: 24 },
          { id: 'm_z', title: 'Nikon Z', count: 15 },
          { id: 'm_l', title: 'L-Mount', count: 12 },
          { id: 'm_mft', title: 'Micro 4/3', count: 17 },
        ],
      },
      {
        id: 'price',
        title: 'Price',
        items: [
          { id: 'p_0_499', title: '$0–$499', count: 18 },
          { id: 'p_500_999', title: '$500–$999', count: 33 },
          { id: 'p_1000_1999', title: '$1000–$1999', count: 29 },
          { id: 'p_2000_plus', title: '$2000+', count: 17 },
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
          { id: 'earbuds', title: 'Earbuds', count: 46 },
        ],
      },
      {
        id: 'connectivity',
        title: 'Connectivity',
        items: [
          { id: 'c_wireless', title: 'Wireless', count: 96 },
          { id: 'c_wired', title: 'Wired', count: 43 },
          { id: 'c_bluetooth_5', title: 'Bluetooth 5.x', count: 78 },
          { id: 'c_usb_c', title: 'USB-C', count: 27 },
        ],
      },
      {
        id: 'features',
        title: 'Features',
        items: [
          { id: 'f_anc', title: 'Noise cancelling (ANC)', count: 52 },
          { id: 'f_transparency', title: 'Transparency mode', count: 31 },
          { id: 'f_mic', title: 'Good microphone', count: 64 },
          { id: 'f_low_latency', title: 'Low latency', count: 22 },
          { id: 'f_multipoint', title: 'Multipoint', count: 19 },
        ],
      },
      {
        id: 'battery',
        title: 'Battery (wireless)',
        items: [
          { id: 'b_0_10', title: 'Up to 10h', count: 18 },
          { id: 'b_10_20', title: '10–20h', count: 29 },
          { id: 'b_20_30', title: '20–30h', count: 27 },
          { id: 'b_30_plus', title: '30h+', count: 22 },
        ],
      },
      {
        id: 'price',
        title: 'Price',
        items: [
          { id: 'p_0_49', title: '$0–$49', count: 32 },
          { id: 'p_50_99', title: '$50–$99', count: 41 },
          { id: 'p_100_199', title: '$100–$199', count: 38 },
          { id: 'p_200_plus', title: '$200+', count: 28 },
        ],
      },
      {
        id: 'sound_signature',
        title: 'Sound',
        items: [
          { id: 's_bass', title: 'Bass-heavy', count: 47 },
          { id: 's_balanced', title: 'Balanced', count: 55 },
          { id: 's_bright', title: 'Bright', count: 26 },
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
          { id: 'dell', title: 'Dell', count: 26 },
          { id: 'hp', title: 'HP', count: 18 },
          { id: 'msi', title: 'MSI', count: 12 },
        ],
      },
      {
        id: 'type',
        title: 'Type',
        items: [
          { id: 't_laptop', title: 'Laptop', count: 82 },
          { id: 't_desktop', title: 'Desktop', count: 23 },
          { id: 't_minipc', title: 'Mini PC', count: 17 },
          { id: 't_allinone', title: 'All-in-one', count: 11 },
        ],
      },
      {
        id: 'cpu',
        title: 'CPU',
        items: [
          { id: 'cpu_i3', title: 'Intel Core i3', count: 14 },
          { id: 'cpu_i5', title: 'Intel Core i5', count: 38 },
          { id: 'cpu_i7', title: 'Intel Core i7', count: 27 },
          { id: 'cpu_i9', title: 'Intel Core i9', count: 9 },
          { id: 'cpu_r5', title: 'AMD Ryzen 5', count: 21 },
          { id: 'cpu_r7', title: 'AMD Ryzen 7', count: 16 },
          { id: 'cpu_m', title: 'Apple Silicon', count: 19 },
        ],
      },
      {
        id: 'ram',
        title: 'RAM',
        items: [
          { id: 'r_8', title: '8 GB', count: 33 },
          { id: 'r_16', title: '16 GB', count: 49 },
          { id: 'r_32', title: '32 GB', count: 22 },
          { id: 'r_64', title: '64 GB', count: 8 },
        ],
      },
      {
        id: 'storage',
        title: 'Storage',
        items: [
          { id: 's_256', title: '256 GB SSD', count: 26 },
          { id: 's_512', title: '512 GB SSD', count: 41 },
          { id: 's_1tb', title: '1 TB SSD', count: 29 },
          { id: 's_2tb', title: '2 TB SSD', count: 12 },
          { id: 's_hdd', title: 'HDD included', count: 17 },
        ],
      },
      {
        id: 'gpu',
        title: 'Graphics',
        items: [
          { id: 'g_integrated', title: 'Integrated', count: 47 },
          { id: 'g_rtx', title: 'NVIDIA RTX', count: 29 },
          { id: 'g_gtx', title: 'NVIDIA GTX', count: 12 },
          { id: 'g_rx', title: 'AMD Radeon', count: 18 },
        ],
      },
      {
        id: 'display',
        title: 'Display (laptops)',
        items: [
          { id: 'd_13_14', title: '13"–14"', count: 23 },
          { id: 'd_15_16', title: '15"–16"', count: 44 },
          { id: 'd_17_plus', title: '17"+', count: 15 },
          { id: 'd_oled', title: 'OLED', count: 19 },
          { id: 'd_120hz', title: '120 Hz+', count: 21 },
        ],
      },
      {
        id: 'price',
        title: 'Price',
        items: [
          { id: 'p_0_499', title: '$0–$499', count: 14 },
          { id: 'p_500_999', title: '$500–$999', count: 39 },
          { id: 'p_1000_1499', title: '$1000–$1499', count: 31 },
          { id: 'p_1500_plus', title: '$1500+', count: 22 },
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
          { id: 'huawei', title: 'Huawei', count: 16 },
          { id: 'fitbit', title: 'Fitbit', count: 11 },
        ],
      },
      {
        id: 'compatibility',
        title: 'Compatibility',
        items: [
          { id: 'co_ios', title: 'iOS', count: 44 },
          { id: 'co_android', title: 'Android', count: 58 },
          { id: 'co_both', title: 'iOS & Android', count: 32 },
        ],
      },
      {
        id: 'case_size',
        title: 'Case size',
        items: [
          { id: 'cs_38_41', title: '38–41 mm', count: 31 },
          { id: 'cs_42_45', title: '42–45 mm', count: 47 },
          { id: 'cs_46_plus', title: '46 mm+', count: 18 },
        ],
      },
      {
        id: 'display',
        title: 'Display',
        items: [
          { id: 'd_amoled', title: 'AMOLED', count: 54 },
          { id: 'd_oled', title: 'OLED', count: 18 },
          { id: 'd_mip', title: 'MIP (transflective)', count: 14 },
          { id: 'd_aod', title: 'Always-on display', count: 41 },
        ],
      },
      {
        id: 'health',
        title: 'Health & sport',
        items: [
          { id: 'h_ecg', title: 'ECG', count: 22 },
          { id: 'h_spo2', title: 'SpO2', count: 48 },
          { id: 'h_gps', title: 'GPS', count: 52 },
          { id: 'h_sleep', title: 'Sleep tracking', count: 61 },
          { id: 'h_water', title: 'Water resistant', count: 59 },
        ],
      },
      {
        id: 'battery',
        title: 'Battery life',
        items: [
          { id: 'b_1_2', title: '1–2 days', count: 29 },
          { id: 'b_3_5', title: '3–5 days', count: 24 },
          { id: 'b_6_10', title: '6–10 days', count: 18 },
          { id: 'b_10_plus', title: '10+ days', count: 13 },
        ],
      },
      {
        id: 'price',
        title: 'Price',
        items: [
          { id: 'p_0_99', title: '$0–$99', count: 18 },
          { id: 'p_100_199', title: '$100–$199', count: 27 },
          { id: 'p_200_399', title: '$200–$399', count: 33 },
          { id: 'p_400_plus', title: '$400+', count: 19 },
        ],
      },
    ],

    Gaming: [
      {
        id: 'platform',
        title: 'Platform',
        items: [
          { id: 'pl_pc', title: 'PC', count: 21 },
          { id: 'pl_ps', title: 'PlayStation', count: 14 },
          { id: 'pl_xbox', title: 'Xbox', count: 12 },
          { id: 'pl_switch', title: 'Nintendo Switch', count: 9 },
        ],
      },
      {
        id: 'type',
        title: 'Type',
        items: [
          { id: 't_console', title: 'Consoles', count: 8 },
          { id: 't_controller', title: 'Controllers', count: 16 },
          { id: 't_headset', title: 'Headsets', count: 18 },
          { id: 't_accessories', title: 'Accessories', count: 22 },
        ],
      },
      {
        id: 'price',
        title: 'Price',
        items: [
          { id: 'p_0_49', title: '$0–$49', count: 19 },
          { id: 'p_50_99', title: '$50–$99', count: 17 },
          { id: 'p_100_199', title: '$100–$199', count: 13 },
          { id: 'p_200_plus', title: '$200+', count: 11 },
        ],
      },
    ],
  }

  const [apiItems, setApiItems] = useState<ProductListItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    getProducts()
      .then((data) => {
        if (!isMounted) return
        setApiItems(data)
      })
      .finally(() => {
        if (!isMounted) return
        setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
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
  }, [])

  const resolvedTitle = selectedCategoryTitle ?? selectedCategory ?? 'All'
  const resolvedKey = selectedCategoryId ?? resolvedTitle

  const filters = useMemo<CatalogSectionFilterBlock[]>(() => {
    if (resolvedTitle === 'All') return allFilters
    if (resolvedTitle in filtersByCategory) return filtersByCategory[resolvedTitle]
    return allFilters
  }, [allFilters, resolvedTitle])

  const filteredApiItems = useMemo<ProductListItem[]>(() => {
    if (resolvedKey === 'All') return apiItems
    if (selectedCategoryId) {
      return apiItems.filter((p) => p.categoryId === selectedCategoryId)
    }
    return apiItems.filter((p) => p.category === resolvedKey || p.categoryId === resolvedKey)
  }, [apiItems, resolvedKey, selectedCategoryId])

  const products: CatalogCardProps[] = useMemo(() => {
    return filteredApiItems.map((p) => ({
      id: p.id,
      title: p.title,
      productIcon: p.productIcon,
      price: p.price,
      productId: p.id,
    }))
  }, [filteredApiItems])

  return (
    <section className="catalogSection">
      <div className="container">
        <CatalogSectionFilters filters={filters} />
        <CatalogSectionProducts items={isLoading ? [] : products} />
      </div>
    </section>
  )
}

export default CatalogSection
