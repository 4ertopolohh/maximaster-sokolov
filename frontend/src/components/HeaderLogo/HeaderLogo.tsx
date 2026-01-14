import '../HeaderLogo/HeaderLogo.scss'
import { Link } from 'react-router-dom'


export type HeaderLogoProps = {
    logo: string
}

const HeaderLogo = ({ logo }:HeaderLogoProps) => {
    return(
        <Link to = '/' className='headerLogo'>
            <img src={logo} alt="" loading='lazy'/>
        </Link>
    )
}

export default HeaderLogo;