import ShopNowButton from '../../../../components/ShopNowButton/ShopNowButton';
import '../BigSummerSaleSection/BigSummerSaleSection.scss'

const BigSummerSaleSection = () => {
    return(
        <section className='bigSummerSaleSection'>
            <div className='container'>
                <h1 className='bigSummerSaleTitle'>Big Summer <span>Sale</span></h1>
                <p className='bigSummerSaleSubtitle'>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
                <ShopNowButton color='#fff'/>
            </div>
        </section>
    )
}

export default BigSummerSaleSection;