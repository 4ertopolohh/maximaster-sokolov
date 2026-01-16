import CatalogCard from '../../../../components/CatalogCard/CatalogCard';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import '../DiscountSection/DiscountSection.scss'

import iphone14Gold from '../../../../assets/images/pictures/iphone14Gold.png'
import productIconIphone14 from '../../../../assets/images/pictures/productIconIphone14.png'
import productIconAirPodsMax from '../../../../assets/images/pictures/productIconAirPodsMax.png'
import productIconAppleWatch from '../../../../assets/images/pictures/productIconAppleWatch.png'

const DiscountSection = () => {
    return(
        <section className='discountSection'>
            <div className='container'>
                <SectionTitle title='Discounts up to -50%'/>
                <div className='discountSectionContent'>
                    <CatalogCard 
                        id=''
                        productIcon={iphone14Gold}
                        title='Apple iPhone 14 Pro 512GB Gold (MQ233)'
                        price='1437'
                    />  
                    <CatalogCard 
                        id=''
                        productIcon={productIconAirPodsMax}
                        title='AirPods Max Silver Starlight Aluminium '
                        price='549'
                    />  
                    <CatalogCard 
                        id=''
                        productIcon={productIconAppleWatch}
                        title='Apple Watch Series 9 GPS 41mm Starlight Aluminium '
                        price='399'
                    />  
                    <CatalogCard 
                        id=''
                        productIcon={productIconIphone14}
                        title='Apple iPhone 14 Pro 1TB Gold (MQ2V3)'
                        price='1499'
                    />  
                </div>
            </div>
        </section>
    )
}

export default DiscountSection;