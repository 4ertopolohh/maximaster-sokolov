import CatalogCard from '../../../../components/CatalogCard/CatalogCard'
import '../MiniCatalogContent/MiniCatalogContent.scss'

export type MiniCatalogContentItem = {
    id: string
    productIcon: string
    title: string
    price: string
}

type MiniCatalogContentProps = {
    items: MiniCatalogContentItem[]
}

const MiniCatalogContent = ({ items }: MiniCatalogContentProps) => {
    return (
        <div className='miniCatalogContent'>
            <ul className='miniCatalogContent'>
                {items.map((item) => (
                    <li key={item.id} className='miniCatalogContentItem'>
                        <CatalogCard
                            id={item.id}
                            title={item.title}
                            productIcon={item.productIcon}
                            price={item.price}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MiniCatalogContent
