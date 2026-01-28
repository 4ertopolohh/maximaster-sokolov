import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Story from '../../components/Story/Story'
import '../InfoPage/InfoPage.scss'
import ProductPreviewSection from './components/ProductPreviewSection/ProductPreviewSection'
import { ROUTES } from '../../shared/routes'
import { getProduct, type ProductDetail } from '../../shared/api/productsApi'
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
  id: string
  preferredColor?: string
}

const INFO_PAGE_SELECTION_STORAGE_KEY = 'infoPage:lastSelection'

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object'
}

const readString = (value: unknown): string | undefined => {
  return typeof value === 'string' ? value : undefined
}

const readSelectionFromSessionStorage = (): ProductSelection | null => {
  try {
    const raw = sessionStorage.getItem(INFO_PAGE_SELECTION_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed)) return null
    const idRaw = readString(parsed.id)
    if (!idRaw) return null
    const preferredColor = readString(parsed.preferredColor)
    return { id: idRaw, preferredColor: preferredColor ?? undefined }
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

  const pick = catalogCardId || productIdRaw || idRaw
  if (!pick) return null

  return { id: pick, preferredColor: preferredColor ?? undefined }
}

const resolveProductSelection = (state: unknown): ProductSelection | null => {
  const fromState = resolveProductSelectionFromLocationState(state)
  if (fromState) return fromState
  return readSelectionFromSessionStorage()
}

const resolveInitialColor = (product: ProductDetail, preferredColor?: string): string => {
  if (preferredColor) {
    if (product.colorVariants && preferredColor in product.colorVariants) return preferredColor
    if (product.colorOptions.includes(preferredColor)) return preferredColor
  }
  return product.colorOptions[0] ?? ''
}

const InfoPage = () => {
  const location = useLocation()
  const selection = useMemo(() => resolveProductSelection(location.state), [location.state])

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!selection) return
    writeSelectionToSessionStorage(selection)
  }, [selection?.id, selection?.preferredColor])

  useEffect(() => {
    if (!selection) return
    let isMounted = true
    setIsLoading(true)
    getProduct(selection.id)
      .then((data) => {
        if (!isMounted) return
        setProduct(data)
      })
      .finally(() => {
        if (!isMounted) return
        setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [selection?.id])

  const [selectedColor, setSelectedColor] = useState<string>('')

  useEffect(() => {
    if (!product) return
    if (product.colorOptions.length === 0) return
    const next = resolveInitialColor(product, selection?.preferredColor)
    setSelectedColor(next)
  }, [product?.id, selection?.preferredColor])

  const resolved = useMemo(() => {
    if (!product) return { title: '', images: [] as string[] }
    const variant = product.colorVariants ? product.colorVariants[selectedColor] : undefined
    if (variant && variant.images.length > 0) {
      return { title: variant.title, images: variant.images }
    }
    return { title: product.title, images: product.images ?? [] }
  }, [product, selectedColor])

  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    if (resolved.images.length === 0) {
      setImages([])
      setSelectedImage('')
      return
    }
    setImages(resolved.images)
    setSelectedImage(resolved.images[0])
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

  if (!selection) {
    return <Navigate to={ROUTES.home} replace />
  }

  if (isLoading || !product) {
    return (
      <main className="page">
        <Story />
      </main>
    )
  }

  const productDescriptionDetailsTitle = product.descriptionSection.detailsTitle
  const productDescriptionDetailsDesc = product.descriptionSection.detailsDesc
  const productDescriptionCharacteristics: ProductDescriptionCharacteristicData[] =
    product.descriptionSection.characteristics

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
        disabledMemoryOptions={product.disabledMemoryOptions ?? undefined}
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
    </main>
  )
}

export default InfoPage
