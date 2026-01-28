import { Link } from 'react-router-dom'
import '../BuyNowButton/BuyNowButton.scss'
import { ROUTES } from '../../shared/routes'

export type BuyNowButtonProps = {
  id: string
  title: string
  productIcon: string
  price: string
  preferredColor?: string
  productId?: string
  catalogCardId?: string
}

type BuyNowLocationState = {
  id: string
  productId?: string
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
