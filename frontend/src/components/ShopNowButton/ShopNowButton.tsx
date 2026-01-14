import '../ShopNowButton/ShopNowButton.scss'
import { Link } from 'react-router-dom'

export type ShopNowButtonProps = {
  color: string
}

const ShopNowButton = ({ color }: ShopNowButtonProps) => {
  const shopNowButtonStyles: React.CSSProperties = {
    color,
    border: `2px solid ${color}`,
  }

  return (
    <Link to={'/catalog'} className="shopNowButton" style={shopNowButtonStyles}>
      Shop Now
    </Link>
  )
}

export default ShopNowButton
