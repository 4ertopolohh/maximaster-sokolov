import iphoneMiniImage1 from '../assets/images/pictures/iphoneMiniImage1.png'
import iphoneMiniImage2 from '../assets/images/pictures/iphoneMiniImage2.png'
import iphoneMiniImage3 from '../assets/images/pictures/iphoneMiniImage3.png'
import iphoneMiniImage4 from '../assets/images/pictures/iphoneMiniImage4.png'

import productIconIphone14 from '../assets/images/pictures/productIconIphone14.png'
import iphone14Gold from '../assets/images/pictures/iphone14Gold.png'
import productIconCamera from '../assets/images/pictures/productIconCamera.png'
import productIconAppleWatch from '../assets/images/pictures/productIconAppleWatch.png'
import productIconAirPodsMax from '../assets/images/pictures/productIconAirPodsMax.png'
import productIconGalaxyWatch from '../assets/images/pictures/productIconGalaxyWatch.png'
import productIconFold5 from '../assets/images/pictures/productIconFold5.png'
import productIconGalaxyBuds from '../assets/images/pictures/productIconGalaxyBuds.png'
import productIconIpad from '../assets/images/pictures/productIconIpad.png'

import screenSizeIcon from '../assets/images/icons/screenSizeIcon.png'
import cpuIcon from '../assets/images/icons/cpuIcon.png'
import numberOfCoresIcon from '../assets/images/icons/numberOfCoresIcon.png'
import mainCameraIcon from '../assets/images/icons/mainCameraIcon.png'
import frontCameraIcon from '../assets/images/icons/frontCameraIcon.png'
import batteryIcon from '../assets/images/icons/batteryIcon.png'

import freeDeliveryIcon from '../assets/images/icons/freeDeliveryIcon.png'
import inStockIcon from '../assets/images/icons/inStockIcon.png'
import guaranteedIcon from '../assets/images/icons/guaranteedIcon.png'

export type ProductId =
  | 'iphone14'
  | 'camera6k'
  | 'watch9'
  | 'airpodsmax'
  | 'galaxywatch6'
  | 'fold5'
  | 'galaxybudsfe'
  | 'ipad9'

export type ProductCharacteristic = {
  icon: string
  title: string
  description: string
}

export type ProductTerm = {
  icon: string
  title: string
  subtitle: string
}

export type ProductColorVariant = {
  title: string
  images: string[]
}

export type ProductDetails = {
  id: ProductId
  title: string
  fullPrice: string
  salePrice: string
  images: string[]
  memoryOptions: string[]
  disabledMemoryOptions?: string[]
  colorOptions: string[]
  colorVariants?: Record<string, ProductColorVariant>
  characteristics: ProductCharacteristic[]
  descriptionText: string
  terms: ProductTerm[]
}

export const PRODUCTS: Record<ProductId, ProductDetails> = {
  iphone14: {
    id: 'iphone14',
    title: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
    fullPrice: '1499',
    salePrice: '1399',
    images: [iphoneMiniImage1, iphoneMiniImage2, iphoneMiniImage3, iphoneMiniImage4],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['1TB'],
    colorOptions: ['#781DBC', '#E1B000', '#000000'],
    colorVariants: {
      '#781DBC': {
        title: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
        images: [iphoneMiniImage1, iphoneMiniImage2, iphoneMiniImage3, iphoneMiniImage4],
      },
      '#E1B000': {
        title: 'Apple iPhone 14 Pro Max 128GB Gold ',
        images: [iphone14Gold],
      },
      '#000000': {
        title: 'Apple iPhone 14 Pro Max 128GB Black ',
        images: [iphoneMiniImage1, iphoneMiniImage2, iphoneMiniImage3, iphoneMiniImage4],
      },
    },
    characteristics: [
      { icon: screenSizeIcon, title: 'Screen size ', description: '6.7"' },
      { icon: cpuIcon, title: 'CPU', description: 'Apple A16 Bionic' },
      { icon: numberOfCoresIcon, title: 'Number of Cores', description: '6' },
      { icon: mainCameraIcon, title: 'Main camera ', description: '48-12 -12 MP' },
      { icon: frontCameraIcon, title: 'Front-camera', description: '12 MP' },
      { icon: batteryIcon, title: 'Battery capacity', description: '4323 mAh' },
    ],
    descriptionText:
      'Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },

  camera6k: {
    id: 'camera6k',
    title: 'Blackmagic Pocket Cinema Camera 6k',
    fullPrice: '1499',
    salePrice: '1399',
    images: [productIconCamera],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['256GB'],
    colorOptions: ['#000000'],
    characteristics: [
      { icon: screenSizeIcon, title: 'Screen size ', description: '5"' },
      { icon: cpuIcon, title: 'Sensor', description: 'Super 35 (23.1 × 12.99 mm)' },
      { icon: numberOfCoresIcon, title: 'Resolution', description: '6144 × 3456 (6K)' },
      { icon: mainCameraIcon, title: 'Recording formats', description: 'Blackmagic RAW / ProRes' },
      { icon: frontCameraIcon, title: 'Lens mount', description: 'Canon EF' },
      { icon: batteryIcon, title: 'ISO', description: 'Dual Native ISO (up to 25,600)' },
    ],
    descriptionText:
      'Cinematic quality in a compact body: Pocket Cinema Camera 6K captures rich 6K footage with a Super 35 sensor for natural depth and smooth background blur. Record in Blackmagic RAW or ProRes to keep maximum detail for color grading and post-production, even in challenging lighting. With a bright 5-inch touchscreen and an EF mount for a wide range of lenses, it’s a powerful choice for films, commercials, music videos, and content creation.',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },

  watch9: {
    id: 'watch9',
    title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium ',
    fullPrice: '1499',
    salePrice: '1399',
    images: [productIconAppleWatch],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['128GB'],
    colorOptions: ['#E8E8E8'],
    characteristics: [
      { icon: screenSizeIcon, title: 'Screen size ', description: '41 mm' },
      { icon: cpuIcon, title: 'Display', description: 'Always-On Retina' },
      { icon: numberOfCoresIcon, title: 'Chip', description: 'Apple S9 SiP' },
      { icon: mainCameraIcon, title: 'Connectivity ', description: 'GPS' },
      { icon: frontCameraIcon, title: 'Health sensors', description: 'Heart rate' },
      { icon: batteryIcon, title: 'Battery capacity', description: 'Up to 18 hours' },
    ],
    descriptionText:
      'Smarter, brighter, and faster every day: Apple Watch Series 9 keeps you connected and on track with a crisp Always-On Retina display that’s easy to read in any light. Powered by the S9 chip, it delivers smooth performance for workouts, notifications, and apps, while advanced health sensors help you monitor heart rate, blood oxygen, and ECG whenever you need it. Track your activity, sleep, and training with precision, get safety features for peace of mind, and enjoy all-day battery life that keeps up from morning to night.',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },

  airpodsmax: {
    id: 'airpodsmax',
    title: 'AirPods Max Silver Starlight Aluminium ',
    fullPrice: '1499',
    salePrice: '1399',
    images: [productIconAirPodsMax],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['512GB'],
    colorOptions: ['#E8E8E8'],
    characteristics: [
      { icon: screenSizeIcon, title: 'Noise control', description: '6.7"' },
      { icon: frontCameraIcon, title: 'Front-camera', description: '12 MP' },
      { icon: batteryIcon, title: 'Battery life', description: 'Up to 20 hours' },
    ],
    descriptionText:
      'Premium over-ear sound with total immersion: AirPods Max deliver rich, detailed audio with deep bass and clear highs, tuned automatically with Adaptive EQ. Active Noise Cancellation blocks outside noise for focused listening, while Transparency mode lets you hear what’s happening around you without taking them off. With Spatial Audio and dynamic head tracking, movies and music feel wide and lifelike, and up to 20 hours of battery life keeps the experience going all day.',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },

  galaxywatch6: {
    id: 'galaxywatch6',
    title: 'Samsung Galaxy Watch6 Classic 47mm Black',
    fullPrice: '1499',
    salePrice: '1399',
    images: [productIconGalaxyWatch],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['1TB'],
    colorOptions: ['#000000'],
    characteristics: [
      { icon: screenSizeIcon, title: 'Size', description: '47 mm' },
      { icon: cpuIcon, title: 'Display', description: 'AMOLED, Always-On' },
      { icon: numberOfCoresIcon, title: 'Chip', description: 'Exynos W930' },
      { icon: mainCameraIcon, title: 'Storage', description: '16 GB' },
      { icon: frontCameraIcon, title: 'Sensors', description: 'HR / ECG / BIA / SpO₂' },
      { icon: batteryIcon, title: 'Battery', description: '425 mAh' },
    ],
    descriptionText:
      'Classic look, modern performance: Galaxy Watch6 Classic pairs a premium design with smooth everyday use and a bright Always-On AMOLED display. Track workouts, sleep, and recovery, and keep an eye on key health metrics like heart rate, ECG, body composition, and oxygen levels. With smart notifications, GPS, and solid battery life, it’s built to keep up from workdays to training days.',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },

  fold5: {
    id: 'fold5',
    title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
    fullPrice: '1499',
    salePrice: '1399',
    images: [productIconFold5],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['1TB'],
    colorOptions: ['#000000'],
    characteristics: [
      { icon: screenSizeIcon, title: 'Screen size ', description: '6.7"' },
      { icon: cpuIcon, title: 'CPU', description: 'Apple A16 Bionic' },
      { icon: numberOfCoresIcon, title: 'Number of Cores', description: '6' },
      { icon: mainCameraIcon, title: 'Main camera ', description: '48-12 -12 MP' },
      { icon: frontCameraIcon, title: 'Front-camera', description: '12 MP' },
      { icon: batteryIcon, title: 'Battery capacity', description: '4323 mAh' },
    ],
    descriptionText:
      'Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },

  galaxybudsfe: {
    id: 'galaxybudsfe',
    title: 'Galaxy Buds FE Graphite',
    fullPrice: '1499',
    salePrice: '1399',
    images: [productIconGalaxyBuds],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['256GB'],
    colorOptions: ['#000000'],
    characteristics: [
      { icon: screenSizeIcon, title: 'Noise', description: 'ANC / Ambient' },
      { icon: cpuIcon, title: 'Audio', description: 'Deep bass, clear vocals' },
      { icon: batteryIcon, title: 'Battery', description: 'Up to 30 h' },
    ],
    descriptionText:
      'Comfortable fit, focused sound: Galaxy Buds FE deliver punchy audio in a compact design that stays secure during daily use. Turn on Active Noise Cancellation to block distractions, or switch to Ambient mode to stay aware of your surroundings. With clear call quality, easy touch controls, and long battery life with the charging case, they’re a great everyday choice for music, work, and commuting.',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },

  ipad9: {
    id: 'ipad9',
    title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    fullPrice: '1499',
    salePrice: '1399',
    images: [productIconIpad],
    memoryOptions: ['128GB', '256GB', '512GB', '1TB'],
    disabledMemoryOptions: ['1TB'],
    colorOptions: ['#E8E8E8'],
    characteristics: [
      { icon: screenSizeIcon, title: 'Screen size ', description: '6.7"' },
      { icon: cpuIcon, title: 'CPU', description: 'Apple A16 Bionic' },
      { icon: numberOfCoresIcon, title: 'Number of Cores', description: '6' },
      { icon: mainCameraIcon, title: 'Main camera ', description: '48-12 -12 MP' },
      { icon: frontCameraIcon, title: 'Front-camera', description: '12 MP' },
      { icon: batteryIcon, title: 'Battery capacity', description: '4323 mAh' },
    ],
    descriptionText:
      'Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras',
    terms: [
      { icon: freeDeliveryIcon, title: 'Free Delivery', subtitle: '1-2 day ' },
      { icon: inStockIcon, title: 'In Stock', subtitle: 'Today' },
      { icon: guaranteedIcon, title: 'Guaranteed', subtitle: '1 year' },
    ],
  },
}

export type CatalogCategory = 'Phones' | 'Cameras' | 'Smart Watches' | 'Headphones' | 'Computers'

export type CatalogCardId = ProductId | 'iphone14Gold' | 'iphone14Black'

export type CatalogCardData = {
  id: CatalogCardId
  productId: ProductId
  title: string
  productIcon: string
  price: string
  preferredColor?: string
}

export const CATALOG_CARDS: Record<CatalogCardId, CatalogCardData> = {
  iphone14: {
    id: 'iphone14',
    productId: 'iphone14',
    title: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
    productIcon: productIconIphone14,
    price: '900',
    preferredColor: '#781DBC',
  },
  iphone14Gold: {
    id: 'iphone14Gold',
    productId: 'iphone14',
    title: 'Apple iPhone 14 Pro Max 128GB Gold ',
    productIcon: iphone14Gold,
    price: '949',
    preferredColor: '#E1B000',
  },
  iphone14Black: {
    id: 'iphone14Black',
    productId: 'iphone14',
    title: 'Apple iPhone 14 Pro Max 128GB Black ',
    productIcon: iphoneMiniImage1,
    price: '949',
    preferredColor: '#000000',
  },
  fold5: {
    id: 'fold5',
    productId: 'fold5',
    title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black',
    productIcon: productIconFold5,
    price: '1799',
  },
  camera6k: {
    id: 'camera6k',
    productId: 'camera6k',
    title: 'Blackmagic Pocket Cinema Camera 6k',
    productIcon: productIconCamera,
    price: '2535',
  },
  watch9: {
    id: 'watch9',
    productId: 'watch9',
    title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium ',
    productIcon: productIconAppleWatch,
    price: '300',
  },
  galaxywatch6: {
    id: 'galaxywatch6',
    productId: 'galaxywatch6',
    title: 'Samsung Galaxy Watch6 Classic 47mm Black',
    productIcon: productIconGalaxyWatch,
    price: '369',
  },
  airpodsmax: {
    id: 'airpodsmax',
    productId: 'airpodsmax',
    title: 'AirPods Max Silver Starlight Aluminium ',
    productIcon: productIconAirPodsMax,
    price: '549',
  },
  galaxybudsfe: {
    id: 'galaxybudsfe',
    productId: 'galaxybudsfe',
    title: 'Galaxy Buds FE Graphite',
    productIcon: productIconGalaxyBuds,
    price: '99.99',
  },
  ipad9: {
    id: 'ipad9',
    productId: 'ipad9',
    title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021',
    productIcon: productIconIpad,
    price: '398',
  },
}

export const CATALOG_PRODUCTS_BY_CATEGORY: Record<CatalogCategory, CatalogCardId[]> = {
  Phones: ['iphone14', 'iphone14Gold', 'iphone14Black', 'fold5'],
  Cameras: ['camera6k'],
  'Smart Watches': ['watch9', 'galaxywatch6'],
  Headphones: ['airpodsmax', 'galaxybudsfe'],
  Computers: ['ipad9'],
}
