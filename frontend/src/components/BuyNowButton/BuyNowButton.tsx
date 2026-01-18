import { Link } from 'react-router-dom'
import '../BuyNowButton/BuyNowButton.scss'
import { ROUTES } from '../../shared/routes'
import type { ProductId } from '../../shared/products'

export type BuyNowButtonProps = {
  id: string
  title: string
  productIcon: string
  price: string
  preferredColor?: string
  productId?: ProductId
  catalogCardId?: string
}

type BuyNowLocationState = {
  id: string
  productId?: ProductId
  catalogCardId?: string
  preferredColor?: string
}

const BuyNowButton = ({ id, preferredColor, productId, catalogCardId }: BuyNowButtonProps) => {
  const state: BuyNowLocationState = {
    id,
    productId,
    catalogCardId,
    preferredColor,
  }

  return (
    <Link to={ROUTES.info} state={state} className="buyNowButton">
      Buy Now
    </Link>
  )
}

export default BuyNowButton
