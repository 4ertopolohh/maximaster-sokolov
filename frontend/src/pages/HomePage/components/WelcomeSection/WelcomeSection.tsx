import '../WelcomeSection/WelcomeSection.scss'
import WelcomeSectionDescription from '../WelcomeSectionDescription/WelcomeSectionDescription';
import welcomeSectionBanner from '../../../../assets/images/pictures/welcomeSectionBanner.png'

const WelcomeSection = () => {
    return(
        <section className='welcomeSection'>
            <div className='container'>
                <WelcomeSectionDescription />
                <img src={welcomeSectionBanner} alt="" loading='lazy' className='welcomeSectionBanner'/>
            </div>
        </section>
    )
}

export default WelcomeSection;