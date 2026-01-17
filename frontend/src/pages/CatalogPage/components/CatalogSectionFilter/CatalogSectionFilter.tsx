import { useState } from 'react';

import '../CatalogSectionFilter/CatalogSectionFilter.scss';
import FilterSearchString from '../FilterSearchString/FilterSearchString';

import filterArrow from '../../../../assets/images/icons/filterArrow.png';
import filterArrowReverse from '../../../../assets/images/icons/filterArrowReverse.png';
import checkboxArrow from '../../../../assets/images/icons/checkboxArrow.png';

export type CatalogSectionFilterItem = {
    id: string;
    title: string;
    count: number;
};

type CatalogSectionFilterProps = {
    title: string;
    items: CatalogSectionFilterItem[];
};

const CatalogSectionFilter = ({ title, items }: CatalogSectionFilterProps) => {
    const [activeById, setActiveById] = useState<Record<string, boolean>>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isArrowFading, setIsArrowFading] = useState<boolean>(false);

    const toggleItem = (id: string) => {
        setActiveById((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleOpen = () => {
        setIsArrowFading(true);
        window.setTimeout(() => {
            setIsOpen((prev) => !prev);
            window.setTimeout(() => {
                setIsArrowFading(false);
            }, 140);
        }, 140);
    };

    return (
        <div className={`catalogSectionFilter${isOpen ? ' isOpen' : ''}`}>
            <button className="filterHeader" type="button" onClick={toggleOpen} aria-expanded={isOpen}>
                <h6 className="filterTitle">{title}</h6>
                <img
                    src={isOpen ? filterArrowReverse : filterArrow}
                    alt=""
                    loading="lazy"
                    className={`filterArrow${isArrowFading ? ' isFading' : ''}`}
                />
            </button>

            <div className="filterBody">
                <FilterSearchString />

                <ul className="filterList">
                    {items.map((item) => {
                        const isActive = Boolean(activeById[item.id]);

                        return (
                            <li className="filtersListItem" key={item.id}>
                                <button
                                    type="button"
                                    className={isActive ? 'isActive' : undefined}
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <span className="filterCheckbox" aria-hidden="true">
                                        <img src={checkboxArrow} alt="" loading="lazy" className="checkboxArrow" />
                                    </span>

                                    <h6 className="filterItemTitle">{item.title}</h6>
                                    <p className="filterItemCount">{item.count}</p>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CatalogSectionFilter;
