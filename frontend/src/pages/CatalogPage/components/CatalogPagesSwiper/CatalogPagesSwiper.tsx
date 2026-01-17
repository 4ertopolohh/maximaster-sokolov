import { useEffect, useMemo, useRef, useState } from 'react';

import CatalogPageSlide from '../CatalogPageSlide/CatalogPageSlide';
import '../CatalogPagesSwiper/CatalogPagesSwiper.scss';

import swiperArrowLeft from '../../../../assets/images/icons/swiperArrowLeft.png';
import swiperArrowRight from '../../../../assets/images/icons/swiperArrowRight.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

type CatalogPagesSwiperProps = {
    totalPages?: number;
    activePage?: number;
    onChange?: (page: number) => void;
};

const CatalogPagesSwiper = ({ totalPages = 1, activePage, onChange }: CatalogPagesSwiperProps) => {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperClass | null>(null);

    const pages = useMemo(() => Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1), [totalPages]);

    const [internalActivePage, setInternalActivePage] = useState<number>(1);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [condensedStart, setCondensedStart] = useState<number>(1);

    const effectiveActivePage =
        typeof activePage === 'number' && Number.isFinite(activePage) ? activePage : internalActivePage;

    const lastPage = Math.max(1, totalPages);
    const isCondensed = totalPages > 5 && !isExpanded;

    const condensedPages = useMemo(() => {
        const maxStart = Math.max(1, lastPage - 2);
        const start = Math.min(Math.max(1, condensedStart), maxStart);
        return [start, start + 1, start + 2].filter((p) => p <= lastPage);
    }, [condensedStart, lastPage]);

    useEffect(() => {
        if (typeof activePage === 'number' && Number.isFinite(activePage)) {
            setInternalActivePage(activePage);
        }
    }, [activePage]);

    useEffect(() => {
        if (totalPages <= 5) {
            setIsExpanded(false);
            setCondensedStart(1);
            return;
        }

        setCondensedStart((prev) => {
            const maxStart = Math.max(1, lastPage - 2);
            return Math.min(Math.max(1, prev), maxStart);
        });
    }, [totalPages, lastPage]);

    useEffect(() => {
        if (isCondensed) return;

        const swiper = swiperRef.current;
        const prevEl = prevRef.current;
        const nextEl = nextRef.current;

        if (!swiper || !prevEl || !nextEl) return;

        if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevEl;
            swiper.params.navigation.nextEl = nextEl;
        }

        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
    }, [pages.length, isCondensed]);

    useEffect(() => {
        if (isCondensed) return;

        const swiper = swiperRef.current;
        if (!swiper) return;

        const index = Math.min(Math.max(effectiveActivePage - 1, 0), pages.length - 1);
        if (swiper.activeIndex !== index) {
            swiper.slideTo(index);
        }
    }, [effectiveActivePage, pages.length, isCondensed]);

    const setPage = (page: number) => {
        setInternalActivePage(page);
        onChange?.(page);
    };

    const handleSlideClick = (page: number) => {
        setPage(page);

        const swiper = swiperRef.current;
        if (swiper) {
            const index = Math.min(Math.max(page - 1, 0), pages.length - 1);
            swiper.slideTo(index);
        }
    };

    const handlePrev = () => {
        if (isCondensed) {
            setCondensedStart((prev) => Math.max(1, prev - 1));
            return;
        }

        const swiper = swiperRef.current;
        if (swiper) swiper.slidePrev();
    };

    const handleNext = () => {
        if (isCondensed) {
            const maxStart = Math.max(1, lastPage - 2);
            setCondensedStart((prev) => Math.min(maxStart, prev + 1));
            return;
        }

        const swiper = swiperRef.current;
        if (swiper) swiper.slideNext();
    };

    const handleExpand = () => {
        setIsExpanded(true);

        const swiper = swiperRef.current;
        if (swiper) {
            swiper.slideTo(0);
        }
    };

    return (
        <div className="catalogPagesSwiper">
            <button type="button" className="catalogPagesNavBtn" ref={prevRef} aria-label="Previous page" onClick={handlePrev}>
                <img src={swiperArrowLeft} alt="" width={24} height={24} />
            </button>

            <div className="catalogPagesSwiperInner">
                {isCondensed ? (
                    <div className="catalogPagesCondensed">
                        {condensedPages.map((page) => (
                            <CatalogPageSlide
                                key={page}
                                number={String(page)}
                                isActive={page === effectiveActivePage}
                                onClick={() => setPage(page)}
                            />
                        ))}

                        <button type="button" className="catalogPagesEllipsis" onClick={handleExpand} aria-label="Show all pages">
                            ....
                        </button>

                        <CatalogPageSlide
                            number={String(lastPage)}
                            isActive={lastPage === effectiveActivePage}
                            onClick={() => setPage(lastPage)}
                        />
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView="auto"
                        spaceBetween={8}
                        loop={false}
                        speed={500}
                        allowTouchMove={true}
                        centeredSlides={false}
                        watchOverflow={false}
                        onSwiper={(swiper: SwiperClass) => {
                            swiperRef.current = swiper;
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current
                        }}
                        className="catalogPagesSwiperTrack"
                    >
                        {pages.map((page) => (
                            <SwiperSlide key={page} className="catalogPagesSlide">
                                <CatalogPageSlide
                                    number={String(page)}
                                    isActive={page === effectiveActivePage}
                                    onClick={() => handleSlideClick(page)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <button type="button" className="catalogPagesNavBtn" ref={nextRef} aria-label="Next page" onClick={handleNext}>
                <img src={swiperArrowRight} alt="" width={24} height={24} />
            </button>
        </div>
    );
};

export default CatalogPagesSwiper;
