import { useState } from 'react'
import BuyNowButton from '../BuyNowButton/BuyNowButton'
import '../CatalogCard/CatalogCard.scss'

import favoriteIconProductCard from '../../assets/images/icons/favoriteIconProductCard.png'
import favoriteIconProductCardActive from '../../assets/images/icons/favoriteIconProductCardActive.png'

export type CatalogCardProps = {
    id: string
    productIcon: string
    title: string
    price: string
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

const CatalogCard = ({ id, productIcon, title, price }: CatalogCardProps) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(() => readFavoriteFromStorage(id))

    const toggleFavorite = () => {
        setIsFavorite((prev) => {
            const next = !prev
            writeFavoriteToStorage(id, next)
            return next
        })
    }

    return (
        <div className='catalogCard'>
            <button
                type='button'
                className={`favoriteButton${isFavorite ? ' isActive' : ''}`}
                onClick={toggleFavorite}
                aria-pressed={isFavorite}
            >
                <img
                    src={isFavorite ? favoriteIconProductCardActive : favoriteIconProductCard}
                    alt=''
                    loading='lazy'
                />
            </button>
            <img src={productIcon} alt='' loading='lazy' className='productIcon' />
            <h6 className='productTitle'>{title}</h6>
            <h4 className='productPrice'>${price}</h4>
            <BuyNowButton />
        </div>
    )
}

export default CatalogCard
