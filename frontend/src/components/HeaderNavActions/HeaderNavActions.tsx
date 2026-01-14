import '../HeaderNavActions/HeaderNavActions.scss'
import { Link } from 'react-router-dom'

import type { HeaderNavActionItem } from '../../App'

export type HeaderNavActionsProps = {
    actions: HeaderNavActionItem []
}

const HeaderNavActions = ({ actions }:HeaderNavActionsProps ) => {
    return(
        <ul className='headerNavActions'>
        {actions.map((item) => (
            <li className="headerNavLinksItem" key={item.to}>
                <Link to={item.to}>
                    <img src={item.icon} alt="" loading='lazy'/>
                </Link>
            </li>
        ))}
        </ul>
    )
}

export default HeaderNavActions;