import '../Footer/Footer.scss'
import FooterDescription from '../FooterDescription/FooterDescription'
import FooterLinks, { type FooterLinkItem } from '../FooterLinks/FooterLinks'
import FooterSocials, { type FooterSocialsItem } from '../FooterSocials/FooterSocials'

import twitterIcon from '../../assets/images/icons/twitterIcon.png'
import facebookIcon from '../../assets/images/icons/facebookIcon.png'
import tiktokIcon from '../../assets/images/icons/tiktokIcon.png'
import instagramIcon from '../../assets/images/icons/instagramIcon.png'

const footerLinks1: FooterLinkItem[] = [
  { label: 'Bonus program', href: 'https://google.com' },
  { label: 'Gift cards', href: 'https://google.com' },
  { label: 'Credit and payment', href: 'https://google.com' },
  { label: 'Service contracts', href: 'https://google.com' },
  { label: 'Non-cash account', href: 'https://google.com' },
  { label: 'Payment', href: 'https://google.com' },
]

const footerLinks2: FooterLinkItem[] = [
  { label: 'Find an order', href: 'https://google.com' },
  { label: 'Terms of delivery', href: 'https://google.com' },
  { label: 'Exchange and return of goods', href: 'https://google.com' },
  { label: 'Guarantee', href: 'https://google.com' },
  { label: 'Frequently asked questions', href: 'https://google.com' },
  { label: 'Terms of use of the site', href: 'https://google.com' },
]

const footerSocials: FooterSocialsItem[] = [
  { icon: twitterIcon, href: 'https://google.com' },
  { icon: facebookIcon, href: 'https://google.com' },
  { icon: tiktokIcon, href: 'https://google.com' },
  { icon: instagramIcon, href: 'https://google.com' },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerMain">
          <FooterDescription />
          <FooterLinks title='Services' items={footerLinks1} />
          <FooterLinks title='Assistance to the buyer' items={footerLinks2} />
        </div>
        <FooterSocials items={footerSocials}/>
      </div>
    </footer>
  )
}

export default Footer
