import { useState } from 'react'
import BuyNowButton from '../BuyNowButton/BuyNowButton'
import '../CatalogCard/CatalogCard.scss'

import favoriteIconProductCard from '../../assets/images/icons/favoriteIconProductCard.png'
import favoriteIconProductCardActive from '../../assets/images/icons/favoriteIconProductCardActive.png'
import { PRODUCTS, type ProductId } from '../../shared/products'

export type CatalogCardProps = {
  id: string
  productIcon: string
  title: string
  price: string
  productId?: ProductId
  preferredColor?: string
}

const getFavoriteStorageKey = (id: string) => `catalogCardFavorite:${id}`

const readFavoriteFromStorage = (id: string): boolean => {
  try {
    const raw = localStorage.getItem(getFavoriteStorageKey(id))
    return raw === '1'
  } catch {
    return false
  }
}

const writeFavoriteToStorage = (id: string, value: boolean) => {
  try {
    if (value) {
      localStorage.setItem(getFavoriteStorageKey(id), '1')
    } else {
      localStorage.removeItem(getFavoriteStorageKey(id))
    }
  } catch {
    return
  }
}

const isProductId = (value: string): value is ProductId => {
  return value in PRODUCTS
}

const getPreferredColorForProduct = (productId: ProductId, title: string): string | undefined => {
  if (productId !== 'iphone14') return undefined
  const lower = title.toLowerCase()
  if (lower.includes('gold')) return '#E1B000'
  return '#781DBC'
}

const CatalogCard = ({ id, productIcon, title, price, productId, preferredColor }: CatalogCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(() => readFavoriteFromStorage(id))

  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      const next = !prev
      writeFavoriteToStorage(id, next)
      return next
    })
  }

  const resolvedProductId: ProductId = productId ? productId : isProductId(id) ? id : 'iphone14'
  const resolvedPreferredColor = preferredColor ? preferredColor : getPreferredColorForProduct(resolvedProductId, title)

  return (
    <div className="catalogCard">
      <button
        type="button"
        className={`favoriteButton${isFavorite ? ' isActive' : ''}`}
        onClick={toggleFavorite}
        aria-pressed={isFavorite}
      >
        <img
          src={isFavorite ? favoriteIconProductCardActive : favoriteIconProductCard}
          alt=""
          loading="lazy"
        />
      </button>
      <img src={productIcon} alt="" loading="lazy" className="productIcon" />
      <h6 className="productTitle">{title}</h6>
      <h4 className="productPrice">${price}</h4>
      <BuyNowButton
        id={id}
        title={title}
        productIcon={productIcon}
        price={price}
        preferredColor={resolvedPreferredColor}
        productId={resolvedProductId}
        catalogCardId={id}
      />
    </div>
  )
}

export default CatalogCard
