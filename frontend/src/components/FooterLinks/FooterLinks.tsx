import '../FooterLinks/FooterLinks.scss'

export type FooterLinkItem = {
  label: string
  href: string
}

export type FooterLinksProps = {
  title: string
  items: FooterLinkItem[]
}

const FooterLinks = ({ title, items }: FooterLinksProps) => {
  return (
    <div className="footerLinks">
      <h6 className="footerLinksTitle">{title}</h6>
      <ul className="footerLinksList">
        {items.map((item) => (
          <li className="footerLinksListItem" key={`${item.href}-${item.label}`}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterLinks
