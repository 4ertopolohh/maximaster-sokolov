import '../FooterSocials/FooterSocials.scss'

export type FooterSocialsItem = {
    icon: string
    href: string
}

export type FooterSocialsProps = {
    items: FooterSocialsItem[]
}

const FooterSocials = ({ items }:FooterSocialsProps) => {
    return(
        <ul className='footerSocials'>
            {items.map((item) => (
                <li className="footerSocialsListItem" key={`${item.href}-${item.icon}`}>
                    <a href={item.href}>
                        <img src={item.icon} alt="" loading='lazy'/>    
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default FooterSocials;