import ShopNowButton from '../../../../components/ShopNowButton/ShopNowButton';
import '../PopularProductsCard/PopularProductsCard.scss';
import { useEffect, useRef, useState } from 'react';

export type PopularProductsCardProps = {
    image: string;
    title: string;
    description: string;
    color: string;
    background: string;
    width?: string;
};

const PopularProductsCard = ({ image, title, description, color, background, width }: PopularProductsCardProps) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        if (isVisible) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [isVisible]);

    const descStyle: React.CSSProperties = {
        color: color,
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: background,
        width: width ?? '25%',
    };

    return (
        <div
            ref={rootRef}
            className={`popularProductsCard${isVisible ? ' popularProductsCard--visible' : ''}`}
            style={cardStyle}
        >
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
