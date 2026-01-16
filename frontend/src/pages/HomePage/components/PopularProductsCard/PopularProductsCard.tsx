import ShopNowButton from '../../../../components/ShopNowButton/ShopNowButton';
import '../PopularProductsCard/PopularProductsCard.scss';

export type PopularProductsCardProps = {
    image: string;
    title: string;
    description: string;
    color: string;
    background: string;
    width?: string;
};

const PopularProductsCard = ({ image, title, description, color, background, width }: PopularProductsCardProps) => {
    const descStyle: React.CSSProperties = {
        color: color,
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: background,
        width: width ?? '25%',
    };

    return (
        <div className='popularProductsCard' style={cardStyle}>
            <img src={image} alt='' className='popularProductCardImage' loading='lazy' />
            <div className='productCardDescription'>
                <h2 className='popularProductCardTitle' style={descStyle}>
                    {title}
                </h2>
                <p className='popularProductCardSubtitle' style={descStyle}>
                    {description}
                </p>
                <ShopNowButton color={color} />
            </div>
        </div>
    );
};

export default PopularProductsCard;
