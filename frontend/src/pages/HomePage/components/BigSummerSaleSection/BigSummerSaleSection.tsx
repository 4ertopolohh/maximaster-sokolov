import { useEffect, useRef, useState } from 'react';
import ShopNowButton from '../../../../components/ShopNowButton/ShopNowButton';
import '../BigSummerSaleSection/BigSummerSaleSection.scss';

const BigSummerSaleSection = () => {
    const rootRef = useRef<HTMLElement | null>(null);
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

    return (
        <section
            ref={rootRef}
            className={`bigSummerSaleSection${isVisible ? ' bigSummerSaleSection--visible' : ''}`}
        >
            <div className='container'>
                <h1 className='bigSummerSaleTitle'>
                    Big Summer <span>Sale</span>
                </h1>
                <p className='bigSummerSaleSubtitle'>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
                <ShopNowButton color='#fff' />
            </div>
        </section>
    );
};

export default BigSummerSaleSection;
