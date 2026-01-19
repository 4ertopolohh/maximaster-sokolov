import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import InDevSection from '../../components/InDevSection/InDevSection'
import Story from '../../components/Story/Story'
import '../InfoPage/InfoPage.scss'
import ProductPreviewSection from './components/ProductPreviewSection/ProductPreviewSection'
import { ROUTES } from '../../shared/routes'
import {
  CATALOG_CARDS,
  PRODUCTS,
  type CatalogCardId,
  type ProductDetails,
  type ProductId,
} from '../../shared/products'
import ProductDescriptionSection, {
  type ProductDescriptionCharacteristicData,
} from './components/ProductDescriptionSection/ProductDescriptionSection'

type ProductRouteState = {
  id?: unknown
  productId?: unknown
  catalogCardId?: unknown
  preferredColor?: unknown
}

type ProductSelection = {
  productId: ProductId
  preferredColor?: string
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object'
}

const readString = (value: unknown): string | undefined => {
  return typeof value === 'string' ? value : undefined
}

const isProductId = (value: string): value is ProductId => {
  return value in PRODUCTS
}

const isCatalogCardId = (value: string): value is CatalogCardId => {
  return value in CATALOG_CARDS
}

const resolveProductSelectionFromLocationState = (state: unknown): ProductSelection | null => {
  if (!isRecord(state)) return null

  const s = state as ProductRouteState

  const preferredColor = readString(s.preferredColor)
  const catalogCardId = readString(s.catalogCardId)
  const productIdRaw = readString(s.productId)
  const idRaw = readString(s.id)

  const resolveFromCardId = (cardId: string): ProductSelection | null => {
    if (!isCatalogCardId(cardId)) return null
    const card = CATALOG_CARDS[cardId]
    return { productId: card.productId, preferredColor: preferredColor ?? card.preferredColor }
  }

  if (catalogCardId) {
    const resolved = resolveFromCardId(catalogCardId)
    if (resolved) return resolved
  }

  if (productIdRaw) {
    if (isProductId(productIdRaw)) return { productId: productIdRaw, preferredColor }
    const resolved = resolveFromCardId(productIdRaw)
    if (resolved) return resolved
  }

  if (idRaw) {
    if (isProductId(idRaw)) return { productId: idRaw, preferredColor }
    const resolved = resolveFromCardId(idRaw)
    if (resolved) return resolved
  }

  return null
}

const resolveInitialColor = (product: ProductDetails, preferredColor?: string): string => {
  if (preferredColor) {
    if (product.colorVariants && preferredColor in product.colorVariants) return preferredColor
    if (product.colorOptions.includes(preferredColor)) return preferredColor
  }
  return product.colorOptions[0] ?? ''
}

const InfoPage = () => {
  const location = useLocation()
  const selection = resolveProductSelectionFromLocationState(location.state)

  if (!selection) {
    return <Navigate to={ROUTES.home} replace />
  }

  const product: ProductDetails = PRODUCTS[selection.productId]

  /*
  const productDescriptionDetailsTitle = 'Details'
  const productDescriptionDetailsDesc =
    "Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many."

  const productDescriptionCharacteristics: ProductDescriptionCharacteristicData[] = [
    {
      title: 'Screen',
      items: [
        { title: 'Screen diagonal', value: '6.7"' },
        { title: 'The screen resolution', value: '2796x1290' },
        { title: 'The screen refresh rate', value: '120 Hz' },
        { title: 'The pixel density', value: '460 ppi' },
        { title: 'Screen type', value: 'OLED' },
        {
          title: 'Additionally',
          value: ['Dynamic Island', 'Always-On display', 'HDR display', 'True Tone', 'Wide color (P3)'],
        },
      ],
    },
    {
      title: 'CPU',
      items: [
        { title: 'Chip', value: 'A16 Bionic' },
        { title: 'CPU cores', value: '6' },
        { title: 'GPU cores', value: '5' },
        { title: 'Neural Engine', value: '16-core' },
        { title: 'Process technology', value: '4 nm' },
        { title: 'RAM', value: '6 GB' },
      ],
    },
    {
      title: 'Camera',
      items: [
        { title: 'Main camera', value: '48 MP, f/1.78' },
        { title: 'Ultra Wide', value: '12 MP, f/2.2' },
        { title: 'Telephoto', value: '12 MP, 3x optical zoom, f/2.8' },
        { title: 'Front camera', value: '12 MP TrueDepth, f/1.9' },
        { title: 'Optical zoom range', value: '6x (2x out, 3x in)' },
        { title: 'Digital zoom', value: 'Up to 15x' },
        {
          title: 'Additionally',
          value: [
            'Sensor-shift OIS',
            'Night mode',
            'Deep Fusion',
            'Smart HDR',
            'Photonic Engine',
            'Apple ProRAW',
            'ProRes video',
          ],
        },
      ],
    },
    {
      title: 'Battery',
      items: [
        { title: 'Battery type', value: 'Li-Ion' },
        { title: 'Capacity', value: '4323 mAh' },
        { title: 'Video playback', value: 'Up to 29 hours' },
        { title: 'Audio playback', value: 'Up to 95 hours' },
        { title: 'Fast charging', value: 'Up to 50% in around 30 minutes (with 20W adapter or higher)' },
        { title: 'Wireless charging', value: 'MagSafe up to 15W, Qi up to 7.5W' },
        {
          title: 'Additionally',
          value: ['MagSafe support', 'USB Power Delivery', 'Charging via Lightning'],
        },
      ],
    },
  ]
  */

  const productDescriptionDetailsTitle = product.descriptionSection.detailsTitle
  const productDescriptionDetailsDesc = product.descriptionSection.detailsDesc
  const productDescriptionCharacteristics: ProductDescriptionCharacteristicData[] =
    product.descriptionSection.characteristics

  const [selectedColor, setSelectedColor] = useState<string>(() =>
    resolveInitialColor(product, selection.preferredColor),
  )

  const resolved = useMemo(() => {
    const variant = product.colorVariants ? product.colorVariants[selectedColor] : undefined
    if (variant) {
      return { title: variant.title, images: variant.images }
    }
    return { title: product.title, images: product.images }
  }, [product.colorVariants, product.images, product.title, selectedColor])

  const [images, setImages] = useState<string[]>(resolved.images)
  const [selectedImage, setSelectedImage] = useState<string>(resolved.images[0] ?? '')

  useEffect(() => {
    const nextColor = resolveInitialColor(product, selection.preferredColor)
    setSelectedColor(nextColor)
  }, [product.id, selection.preferredColor])

  useEffect(() => {
    setImages(resolved.images)
    setSelectedImage(resolved.images[0] ?? '')
  }, [resolved.images])

  const handleSelectColor = (color: string) => {
    setSelectedColor(color)
  }

  const handleSelectImage = (nextImage: string) => {
    setImages((prevImages) => {
      const prevSelected = selectedImage
      if (nextImage === prevSelected) {
        return prevImages
      }

      const nextIndex = prevImages.findIndex((img) => img === nextImage)
      const prevIndex = prevImages.findIndex((img) => img === prevSelected)

      if (nextIndex === -1 || prevIndex === -1) {
        return prevImages
      }

      const updated = [...prevImages]
      updated[prevIndex] = nextImage
      updated[nextIndex] = prevSelected

      return updated
    })

    setSelectedImage(nextImage)
  }

  return (
    <main className="page">
      <Story />
      <ProductPreviewSection
        title={resolved.title}
        productTitle={resolved.title}
        fullPrice={product.fullPrice}
        salePrice={product.salePrice}
        images={images}
        selectedImage={selectedImage}
        onSelectImage={handleSelectImage}
        memoryOptions={product.memoryOptions}
        disabledMemoryOptions={product.disabledMemoryOptions}
        selectedColor={selectedColor}
        onSelectColor={handleSelectColor}
        colorOptions={product.colorOptions}
        characteristics={product.characteristics}
        descriptionText={product.descriptionText}
        terms={product.terms}
      />
      <ProductDescriptionSection
        detailsTitle={productDescriptionDetailsTitle}
        detailsDesc={productDescriptionDetailsDesc}
        characteristics={productDescriptionCharacteristics}
      />
      <InDevSection sectionName="Info" />
    </main>
  )
}

export default InfoPage
