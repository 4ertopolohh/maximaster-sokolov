import '../ProductDescriptionCharacteristic/ProductDescriptionCharacteristic.scss'
import type {
  ProductDescriptionCharacteristicItem,
  ProductDescriptionCharacteristicValue,
} from '../ProductDescriptionSection/ProductDescriptionSection'

type ProductDescriptionCharacteristicProps = {
  title: string
  items: ProductDescriptionCharacteristicItem[]
}

const ProductDescriptionCharacteristic = ({ title, items }: ProductDescriptionCharacteristicProps) => {
    /*
    return( 
        <div className='productDescriptionCharacteristic'>
            <h4 className='productDescriptionCharacteristicTitle'>Screen</h4>
            <ul className='productDescriptionCharacteristicList'>
                <li className='productDescriptionCharacteristicListItem'>
                    <h5 className='productDescriptionCharacteristicListItemTitle'>Screen diagonal</h5>
                    <p className='productDescriptionCharacteristicListItemValue'>6.7"</p>
                </li>
                <li className='productDescriptionCharacteristicListItem'>
                    <h5 className='productDescriptionCharacteristicListItemTitle'>The screen resolution</h5>
                    <p className='productDescriptionCharacteristicListItemValue'>2796x1290</p>
                </li>
                <li className='productDescriptionCharacteristicListItem'>
                    <h5 className='productDescriptionCharacteristicListItemTitle'>The screen refresh rate</h5>
                    <p className='productDescriptionCharacteristicListItemValue'>120 Hz</p>
                </li>
                <li className='productDescriptionCharacteristicListItem'>
                    <h5 className='productDescriptionCharacteristicListItemTitle'>The pixel density</h5>
                    <p className='productDescriptionCharacteristicListItemValue'>460 ppi</p>
                </li>
                <li className='productDescriptionCharacteristicListItem'>
                    <h5 className='productDescriptionCharacteristicListItemTitle'>Screen type</h5>
                    <p className='productDescriptionCharacteristicListItemValue'>OLED</p>
                </li>
                <li className='productDescriptionCharacteristicListItem'>
                    <h5 className='productDescriptionCharacteristicListItemTitle'>Additionally</h5>
                    <ul className='productDescriptionCharacteristicListItemValue'>
                        <li className='productDescriptionCharacteristicListItemValueItem'>Dynamic Island</li>
                        <li className='productDescriptionCharacteristicListItemValueItem'>Always-On display</li>
                        <li className='productDescriptionCharacteristicListItemValueItem'>HDR display</li>
                        <li className='productDescriptionCharacteristicListItemValueItem'>True Tone</li>
                        <li className='productDescriptionCharacteristicListItemValueItem'>Wide color (P3)</li>
                    </ul>
                </li>
            </ul>
        </div>
    )
    */

    const renderValue = (value: ProductDescriptionCharacteristicValue) => {
      if (Array.isArray(value)) {
        return (
          <ul className='productDescriptionCharacteristicListItemValue'>
            {value.map((item, index) => (
              <li className='productDescriptionCharacteristicListItemValueItem' key={`${item}-${index}`}>
                {item}
              </li>
            ))}
          </ul>
        )
      }

      return <p className='productDescriptionCharacteristicListItemValue'>{value}</p>
    }

    return( 
        <div className='productDescriptionCharacteristic'>
            <h4 className='productDescriptionCharacteristicTitle'>{title}</h4>
            <ul className='productDescriptionCharacteristicList'>
                {items.map((item, index) => (
                  <li className='productDescriptionCharacteristicListItem' key={`${item.title}-${index}`}>
                      <h5 className='productDescriptionCharacteristicListItemTitle'>{item.title}</h5>
                      {renderValue(item.value)}
                  </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductDescriptionCharacteristic;
