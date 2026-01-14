import '../HeaderNavLinks/HeaderNavLinks.scss'
import { NavLink } from 'react-router-dom'
import type { HeaderNavLinkItem } from '../../App'

type HeaderNavLinksProps = {
  links: HeaderNavLinkItem[]
}

const HeaderNavLinks = ({ links }: HeaderNavLinksProps) => {
  return (
    <ul className="headerNavLinks">
      {links.map((item) => (
        <li className="headerNavLinksItem" key={item.to}>
          <NavLink
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'headerNavLinksLink headerNavLinksLinkActive' : 'headerNavLinksLink'
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default HeaderNavLinks
