import '../TermsOfPurchaseBlock/TermsOfPurchaseBlock.scss'

export type TermsOfPurchaseBlockProps = {
    icon: string
    title: string
    subtitle: string
}

const TermsOfPurchaseBlock = ({ icon, title, subtitle }:TermsOfPurchaseBlockProps) => {
    return(
        <div className='termsOfPurchaseBlock'>
            <div className='termsOfPurchaseBlockIcon'>
                <img src={icon} alt="" loading='lazy'/>
            </div>
            <div className='termsOfPurchaseBlockDesc'>
                <h6 className='termsOfPurchaseBlockTitle'>{title}</h6>
                <h5 className='termsOfPurchaseBlockSubtitle'>{subtitle}</h5>
            </div>
        </div>
    )
}

export default TermsOfPurchaseBlock;