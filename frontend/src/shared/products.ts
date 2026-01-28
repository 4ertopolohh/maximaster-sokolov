import iphoneMiniImage1 from '../assets/images/pictures/iphoneMiniImage1.png'
import iphoneMiniImage2 from '../assets/images/pictures/iphoneMiniImage2.png'
import iphoneMiniImage3 from '../assets/images/pictures/iphoneMiniImage3.png'
import iphoneMiniImage4 from '../assets/images/pictures/iphoneMiniImage4.png'

import productIconIphone14 from '../assets/images/pictures/productIconIphone14.png'
import iphone14Gold from '../assets/images/pictures/iphone14Gold.png'
// import productIconCamera from '../assets/images/pictures/productIconCamera.png'
// import productIconAppleWatch from '../assets/images/pictures/productIconAppleWatch.png'
// import productIconAirPodsMax from '../assets/images/pictures/productIconAirPodsMax.png'
// import productIconGalaxyWatch from '../assets/images/pictures/productIconGalaxyWatch.png'
// import productIconFold5 from '../assets/images/pictures/productIconFold5.png'
// import productIconGalaxyBuds from '../assets/images/pictures/productIconGalaxyBuds.png'
// import productIconIpad from '../assets/images/pictures/productIconIpad.png'

import screenSizeIcon from '../assets/images/icons/screenSizeIcon.png'
import cpuIcon from '../assets/images/icons/cpuIcon.png'
import numberOfCoresIcon from '../assets/images/icons/numberOfCoresIcon.png'
import mainCameraIcon from '../assets/images/icons/mainCameraIcon.png'
import frontCameraIcon from '../assets/images/icons/frontCameraIcon.png'
import batteryIcon from '../assets/images/icons/batteryIcon.png'

import freeDeliveryIcon from '../assets/images/icons/freeDeliveryIcon.png'
import inStockIcon from '../assets/images/icons/inStockIcon.png'
import guaranteedIcon from '../assets/images/icons/guaranteedIcon.png'

export type ProductId = string

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

export type ProductDescriptionCharacteristicValue = string | string[]

export type ProductDescriptionCharacteristicItem = {
  title: string
  value: ProductDescriptionCharacteristicValue
}

export type ProductDescriptionCharacteristicData = {
  title: string
  items: ProductDescriptionCharacteristicItem[]
}

export type ProductDescriptionSectionData = {
  detailsTitle: string
  detailsDesc: string
  characteristics: ProductDescriptionCharacteristicData[]
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
  descriptionSection: ProductDescriptionSectionData
}

export const PRODUCTS: Record<string, ProductDetails> = {
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
    descriptionSection: {
      detailsTitle: 'Details',
      detailsDesc:
        "Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display.",
      characteristics: [],
    },
  },
}

export type CatalogCategory = 'Phones' | 'Cameras' | 'Smart Watches' | 'Headphones' | 'Computers'

export type CatalogCardId = string

export type CatalogCardData = {
  id: CatalogCardId
  productId: ProductId
  title: string
  productIcon: string
  price: string
  preferredColor?: string
}

export const CATALOG_CARDS: Record<string, CatalogCardData> = {
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
}

export const CATALOG_PRODUCTS_BY_CATEGORY: Record<CatalogCategory, string[]> = {
  Phones: ['iphone14', 'iphone14Gold', 'iphone14Black'],
  Cameras: [],
  'Smart Watches': [],
  Headphones: [],
  Computers: [],
}
