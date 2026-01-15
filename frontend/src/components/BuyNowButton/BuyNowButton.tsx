import { Link } from 'react-router-dom';
import '../BuyNowButton/BuyNowButton.scss'

const BuyNowButton = () => {
    return(
        <Link to='/catalog' className='buyNowButton'>Buy Now</Link>
    )
}

export default BuyNowButton;