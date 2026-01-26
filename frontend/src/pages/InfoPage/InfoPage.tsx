import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
// import InDevSection from '../../components/InDevSection/InDevSection'
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

const INFO_PAGE_SELECTION_STORAGE_KEY = 'infoPage:lastSelection'

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

const readSelectionFromSessionStorage = (): ProductSelection | null => {
  try {
    const raw = sessionStorage.getItem(INFO_PAGE_SELECTION_STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed)) return null

    const productIdRaw = readString(parsed.productId)
    if (!productIdRaw || !isProductId(productIdRaw)) return null

    const preferredColor = readString(parsed.preferredColor)

    return { productId: productIdRaw, preferredColor: preferredColor ?? undefined }
  } catch {
    return null
  }
}

const writeSelectionToSessionStorage = (selection: ProductSelection) => {
  try {
    sessionStorage.setItem(INFO_PAGE_SELECTION_STORAGE_KEY, JSON.stringify(selection))
  } catch {
    return
  }
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

const resolveProductSelection = (state: unknown): ProductSelection | null => {
  const fromState = resolveProductSelectionFromLocationState(state)
  if (fromState) return fromState
  return readSelectionFromSessionStorage()
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

  const selection = useMemo(() => resolveProductSelection(location.state), [location.state])
  const product: ProductDetails | null = selection ? PRODUCTS[selection.productId] : null

  useEffect(() => {
    if (!selection) return
    writeSelectionToSessionStorage(selection)
  }, [selection?.productId, selection?.preferredColor])

  const productDescriptionDetailsTitle = product ? product.descriptionSection.detailsTitle : ''
  const productDescriptionDetailsDesc = product ? product.descriptionSection.detailsDesc : ''
  const productDescriptionCharacteristics: ProductDescriptionCharacteristicData[] = product
    ? product.descriptionSection.characteristics
    : []

  const [selectedColor, setSelectedColor] = useState<string>(() => {
    if (!product) return ''
    return resolveInitialColor(product, selection?.preferredColor)
  })

  const resolved = useMemo(() => {
    if (!product) return { title: '', images: [] as string[] }
    const variant = product.colorVariants ? product.colorVariants[selectedColor] : undefined
    if (variant) {
      return { title: variant.title, images: variant.images }
    }
    return { title: product.title, images: product.images }
  }, [product, selectedColor])

  const [images, setImages] = useState<string[]>(() => resolved.images)
  const [selectedImage, setSelectedImage] = useState<string>(() => resolved.images[0] ?? '')

  useEffect(() => {
    if (!product) return
    const nextColor = resolveInitialColor(product, selection?.preferredColor)
    setSelectedColor(nextColor)
  }, [product?.id, selection?.preferredColor])

  useEffect(() => {
    setImages(resolved.images)
    setSelectedImage(resolved.images[0] ?? '')
  }, [resolved.images])

  useEffect(() => {
    if (!product) return
    if (!selectedColor) return
    writeSelectionToSessionStorage({ productId: product.id, preferredColor: selectedColor })
  }, [product?.id, selectedColor])

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

  if (!selection || !product) {
    return <Navigate to={ROUTES.home} replace />
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
      {/* <InDevSection sectionName="Info" /> */}
    </main>
  )
}

export default InfoPage
