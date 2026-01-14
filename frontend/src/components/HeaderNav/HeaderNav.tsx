import '../HeaderNav/HeaderNav.scss'
import HeaderNavActions from '../HeaderNavActions/HeaderNavActions'
import HeaderNavLinks from '../HeaderNavLinks/HeaderNavLinks'
import type { HeaderNavLinkItem } from '../../App'
import type { HeaderNavActionItem } from '../../App'

type HeaderNavProps = {
  links: HeaderNavLinkItem[]
  actions: HeaderNavActionItem[]
}

const HeaderNav = ({ links, actions }: HeaderNavProps) => {
  return (
    <nav className="headerNav">
      <HeaderNavLinks links={links} />
      <HeaderNavActions actions={actions}/>
    </nav>
  )
}

export default HeaderNav
