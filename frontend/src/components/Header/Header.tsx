import '../Header/Header.scss'

import HeaderLogo from '../HeaderLogo/HeaderLogo'
import HeaderNav from '../HeaderNav/HeaderNav'
import SearchString from '../SearchString/SearchString'
import type { HeaderNavLinkItem } from '../../App'
import type { HeaderNavActionItem } from '../../App'
import headerLogo from '../../assets/images/pictures/headerLogo.svg'

type HeaderProps = {
  links: HeaderNavLinkItem[]
  actions: HeaderNavActionItem[]
}

const Header = ({ links, actions }: HeaderProps) => {
  return (
    <header className="header">
      <div className="container">
        <HeaderLogo logo={headerLogo}/>
        <SearchString />
        <HeaderNav links={links} actions={actions}/>
      </div>
    </header>
  )
}

export default Header
