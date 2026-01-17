import { useEffect, useMemo, useState } from 'react';

import CatalogCard from '../../../../components/CatalogCard/CatalogCard';
import type { CatalogCardProps } from '../../../../components/CatalogCard/CatalogCard';
import CatalogPagesSwiper from '../CatalogPagesSwiper/CatalogPagesSwiper';
import '../CatalogSectionProducts/CatalogSectionProducts.scss';
import CatalogProductsHeader from '../CatalogProductsHeader/CatalogProductsHeader';
import type { HeaderFilterValue } from '../HeaderFilter/HeaderFilter';

type CatalogSectionProductsProps = {
    items: CatalogCardProps[];
};

const PAGE_SIZE = 9;

const parsePrice = (value: string): number => {
    const normalized = value.replace(/[^0-9.]/g, '');
    const num = Number.parseFloat(normalized);
    return Number.isFinite(num) ? num : 0;
};

const CatalogSectionProducts = ({ items }: CatalogSectionProductsProps) => {
    const itemsSignature = useMemo(() => items.map((item) => item.id).join('|'), [items]);

    const [activePage, setActivePage] = useState<number>(1);
    const [sortValue, setSortValue] = useState<HeaderFilterValue>('rating');

    useEffect(() => {
        setActivePage(1);
        setSortValue('rating');
    }, [itemsSignature]);

    const sortedItems = useMemo(() => {
        if (sortValue === 'rating') return items;

        const copy = items.slice();
        copy.sort((a, b) => {
            const pa = parsePrice(a.price);
            const pb = parsePrice(b.price);

            if (sortValue === 'descending') return pb - pa;
            return pa - pb;
        });

        return copy;
    }, [items, sortValue]);

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(sortedItems.length / PAGE_SIZE)),
        [sortedItems.length]
    );

    useEffect(() => {
        setActivePage((prev) => {
            if (prev < 1) return 1;
            if (prev > totalPages) return totalPages;
            return prev;
        });
    }, [totalPages]);

    const startIndex = useMemo(() => (activePage - 1) * PAGE_SIZE, [activePage]);

    const currentItems = useMemo(() => {
        const endIndex = startIndex + PAGE_SIZE;
        return sortedItems.slice(startIndex, endIndex);
    }, [sortedItems, startIndex]);

    return (
        <div className="catalogSectionProductsWrapper">
            <CatalogProductsHeader
                count={String(items.length)}
                sortValue={sortValue}
                onSortChange={setSortValue}
            />

            <div className="catalogSectionProducts">
                {currentItems.map((item, index) => (
                    <CatalogCard
                        key={`${item.id}-${startIndex + index}`}
                        id={item.id}
                        productIcon={item.productIcon}
                        title={item.title}
                        price={item.price}
                    />
                ))}
            </div>

            <CatalogPagesSwiper totalPages={totalPages} activePage={activePage} onChange={setActivePage} />
        </div>
    );
};

export default CatalogSectionProducts;
