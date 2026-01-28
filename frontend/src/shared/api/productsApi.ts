export type Category = {
  id: string
  title: string
  icon: string
  order?: number
}

export type ProductListItem = {
  id: string
  title: string
  productIcon: string
  price: string
  category: string
  categoryId: string
}

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

export type ProductDescriptionCharacteristicItem = {
  title: string
  value: string | string[]
}

export type ProductDescriptionCharacteristicGroup = {
  title: string
  items: ProductDescriptionCharacteristicItem[]
}

export type ProductDescriptionSection = {
  detailsTitle: string
  detailsDesc: string
  characteristics: ProductDescriptionCharacteristicGroup[]
}

export type ProductDetail = {
  id: string
  title: string
  category: string
  categoryId: string
  fullPrice: string
  salePrice: string
  previewImage: string
  images: string[]
  memoryOptions: string[]
  disabledMemoryOptions: string[] | null
  colorOptions: string[]
  colorVariants: Record<string, ProductColorVariant> | null
  characteristics: ProductCharacteristic[]
  descriptionText: string
  terms: ProductTerm[]
  descriptionSection: ProductDescriptionSection
}

const parseJson = async <T>(res: Response): Promise<T> => {
  const data: unknown = await res.json()
  return data as T
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories/')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseJson<Category[]>(res)
}

export const getProducts = async (): Promise<ProductListItem[]> => {
  const res = await fetch('/api/products/')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseJson<ProductListItem[]>(res)
}

export const getProduct = async (id: string): Promise<ProductDetail> => {
  const res = await fetch(`/api/products/${id}/`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseJson<ProductDetail>(res)
}

export const createProduct = async (
  payload: Partial<ProductDetail>,
): Promise<ProductDetail> => {
  const res = await fetch('/api/products/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseJson<ProductDetail>(res)
}

export const updateProduct = async (
  id: string,
  payload: Partial<ProductDetail>,
): Promise<ProductDetail> => {
  const res = await fetch(`/api/products/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return parseJson<ProductDetail>(res)
}

export const deleteProduct = async (id: string): Promise<void> => {
  const res = await fetch(`/api/products/${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}
