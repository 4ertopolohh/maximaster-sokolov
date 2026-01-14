import '../FooterDescription/FooterDescription.scss';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import footerLogo from '../../assets/images/pictures/footerLogo.svg'

const FooterDescription = () => {
    return(
        <div className='footerDescription'>
            <HeaderLogo logo={footerLogo}/>
            <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
        </div>
    )
}

export default FooterDescription;