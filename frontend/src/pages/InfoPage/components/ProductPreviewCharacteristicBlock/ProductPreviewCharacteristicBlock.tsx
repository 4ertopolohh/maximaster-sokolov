import '../ProductPreviewCharacteristicBlock/ProductPreviewCharacteristicBlock.scss'

export type ProductPreviewCharacteristicBlockProps = {
    icon: string
    title: string
    description: string
}

const ProductPreviewCharacteristicBlock = ({ icon, title, description }:ProductPreviewCharacteristicBlockProps) => {
    return(
        <div className='productPreviewCharacteristicBlock'>
            <img src={icon} alt="" loading='lazy' className='characteristicBlockIcon'/>
            <div className='characteristicBlock'>
                <h6 className='characteristicBlockTitle'>{title}</h6>
                <p className='characteristicBlockDescription'>{description}</p>
            </div>
        </div>
    )
}

export default ProductPreviewCharacteristicBlock;