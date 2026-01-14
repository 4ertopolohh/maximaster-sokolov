import ShopNowButton from '../../../../components/ShopNowButton/ShopNowButton';
import '../WelcomeSectionDescription/WelcomeSectionDescription.scss'

const WelcomeSectionDescription = () => {
    return(
        <div className='welcomeSectionDescription'>
            <h3 className='welcomeSectionEyeBrow'>Pro. Beyond.</h3>
            <h1 className='welcomeSectionTitle'>iPhone 14 <span>Pro</span></h1>
            <p className='welcomeSectionSubtitle'>Created to change everything for the better. For everyone</p>
            <ShopNowButton color='#fff'/>
        </div>
    )
}

export default WelcomeSectionDescription;