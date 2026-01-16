import PopularProductsCard from '../PopularProductsCard/PopularProductsCard';
import '../PopularProductsSection/PopularProductsSection.scss'

import popularProductAll from '../../../../assets/images/pictures/popularProductAll.png'
import popularProductIpad from '../../../../assets/images/pictures/popularProductIpad.png'
import popularProductSamsung from '../../../../assets/images/pictures/popularProductSamsung.png'
import popularProductMacBook from '../../../../assets/images/pictures/popularProductMacBook.png'

const PopularProductsSection = () => {
    return(
        <section className='popularProductsSection'>
            <PopularProductsCard 
                image={popularProductAll}
                title='Popular Products'
                description='iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.'
                color='#000'
                background='#fff'
            />
            <PopularProductsCard 
                image={popularProductIpad}
                title='Ipad Pro'
                description='iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.'
                color='#000'
                background='#F9F9F9'
            />
            <PopularProductsCard 
                image={popularProductSamsung}
                title='Samsung Galaxy '
                description='iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.'
                color='#000'
                background='#EAEAEA'
            />
            <PopularProductsCard 
                image={popularProductMacBook}
                title='Macbook Pro'
                description='iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.'
                color='#fff'
                background='#2C2C2C'
            />
        </section>
    )
}

export default PopularProductsSection;