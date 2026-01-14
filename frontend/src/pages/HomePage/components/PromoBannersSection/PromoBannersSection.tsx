import PromoBanner from '../PromoBanner/PromoBanner';
import '../PromoBannersSection/PromoBannersSection.scss'

import playStationPromo from '../../../../assets/images/pictures/playStationPromo.png'
import airPodsMaxPromo from '../../../../assets/images/pictures/airPodsMaxPromo.png'
import visionProPromo from '../../../../assets/images/pictures/visionProPromo.png'
import macBookPromo from '../../../../assets/images/pictures/macBookPromo.png'

const PromoBannersSection = () => {
    return(
        <section className='promoBannersSection'>
            <div className='promoMiniBanners'>
                <PromoBanner 
                    promoBannerImage={playStationPromo}
                    promoBannerTitle='Playstation 5'
                    promoBannerSubtitle='Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.'
                    shopNowButtonColor='#000'
                    width={'100%'}
                    height={328}
                    backgroundColor='#fefffe'
                    titleFontSize={49}
                    subtitleFontSize={14}
                    titleColor='#000'
                    subtitleColor='#000'
                    promoBannerImageWidth={360}
                    align={'left'}
                    showShopNowButton={false}
                />
                <PromoBanner 
                    promoBannerImage={airPodsMaxPromo}
                    promoBannerTitle='Apple AirPods'
                    promoBannerTitleSpan='Max'
                    promoBannerSubtitle="Computational audio. Listen, it's powerful"
                    shopNowButtonColor='#000'
                    width={'50%'}
                    height={272}
                    backgroundColor='#EDEDED'
                    titleFontSize={29}
                    subtitleFontSize={14}
                    titleColor='#000'
                    subtitleColor='#000'
                    promoBannerImageWidth={104}
                    align={'left'}
                    showShopNowButton={false}
                    promoBannerImageMargin={30}
                    titleWidth={150}
                    subtitleWidth={160}
                    descriptionGap={10}
                    titleLineHeight={'40px'}
                />
                <PromoBanner 
                    promoBannerImage={visionProPromo}
                    promoBannerTitle='Apple Vision'
                    promoBannerTitleSpan='Pro'
                    promoBannerSubtitle='An immersive way to experience entertainment'
                    shopNowButtonColor='#000'
                    width={'50%'}
                    height={272}
                    backgroundColor='#353535'
                    titleFontSize={29}
                    subtitleFontSize={14}
                    titleColor='#fff'
                    subtitleColor='#fff'
                    promoBannerImageWidth={136}
                    align={'left'}
                    showShopNowButton={false}
                    promoBannerImageMargin={30}
                    titleWidth={150}
                    subtitleWidth={160}
                    descriptionGap={10}
                    titleLineHeight={'40px'}
                />
            </div>
            <PromoBanner 
                promoBannerImage={macBookPromo}
                promoBannerTitle='Macbook'
                promoBannerTitleSpan='Air'
                promoBannerSubtitle='The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.'
                shopNowButtonColor='#000'
                width={'50%'}
                height={600}
                backgroundColor='#EDEDED'
                titleFontSize={64}
                subtitleFontSize={14}
                titleColor='#000'
                subtitleColor='#000'
                promoBannerImageWidth={292}
                align={'right'}
                showShopNowButton={true}
            />
        </section>
    )
}

export default PromoBannersSection;