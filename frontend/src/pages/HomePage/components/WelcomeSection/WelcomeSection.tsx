import { useEffect, useState } from 'react';
import '../WelcomeSection/WelcomeSection.scss';
import WelcomeSectionDescription from '../WelcomeSectionDescription/WelcomeSectionDescription';
import welcomeSectionBanner from '../../../../assets/images/pictures/welcomeSectionBanner.png';

const WelcomeSection = () => {
    const [isBannerVisible, setIsBannerVisible] = useState(false);

    useEffect(() => {
        const id = window.setTimeout(() => setIsBannerVisible(true), 30);
        return () => window.clearTimeout(id);
    }, []);

    return (
        <section className='welcomeSection'>
            <div className='container'>
                <WelcomeSectionDescription />
                <img
                    src={welcomeSectionBanner}
                    alt=''
                    loading='lazy'
                    className={`welcomeSectionBanner${isBannerVisible ? ' welcomeSectionBanner--visible' : ''}`}
                />
            </div>
        </section>
    );
};

export default WelcomeSection;
