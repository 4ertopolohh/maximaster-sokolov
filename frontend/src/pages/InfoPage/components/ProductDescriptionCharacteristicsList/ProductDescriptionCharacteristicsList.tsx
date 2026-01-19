import ProductDescriptionCharacteristic from '../ProductDescriptionCharacteristic/ProductDescriptionCharacteristic';
import '../ProductDescriptionCharacteristicsList/ProductDescriptionCharacteristicsList.scss'
import type { ProductDescriptionCharacteristicData } from '../ProductDescriptionSection/ProductDescriptionSection'

type ProductDescriptionCharacteristicsListProps = {
  characteristics: ProductDescriptionCharacteristicData[]
}

const ProductDescriptionCharacteristicsList = ({ characteristics }: ProductDescriptionCharacteristicsListProps) => {
    /*
    return(
        <ul className='productDescriptionCharacteristicsList'>
            <li className='productDescriptionCharacteristicsListItem'>
                <ProductDescriptionCharacteristic />
            </li>
            <li className='productDescriptionCharacteristicsListItem'>
                <ProductDescriptionCharacteristic />
            </li>
            <li className='productDescriptionCharacteristicsListItem'>
                <ProductDescriptionCharacteristic />
            </li>
        </ul>
    )
    */

    return(
        <ul className='productDescriptionCharacteristicsList'>
            {characteristics.map((characteristic, index) => (
                <li className='productDescriptionCharacteristicsListItem' key={`${characteristic.title}-${index}`}>
                    <ProductDescriptionCharacteristic title={characteristic.title} items={characteristic.items} />
                </li>
            ))}
        </ul>
    )
}

export default ProductDescriptionCharacteristicsList;
    