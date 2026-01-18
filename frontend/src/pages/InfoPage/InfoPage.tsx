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
      <InDevSection sectionName="Info" />
    </main>
  )
}

export default InfoPage
