import { useMemo, useState } from 'react';

import '../HeaderFilter/HeaderFilter.scss';

import headerFilterArrow from '../../../../assets/images/icons/headerFilterArrow.png';
import filterArrowReverse from '../../../../assets/images/icons/headerFilterArrowReverse.png';

export type HeaderFilterValue = 'rating' | 'descending' | 'ascending';

type HeaderFilterOption = {
    id: HeaderFilterValue;
    label: string;
};

type HeaderFilterProps = {
    value: HeaderFilterValue;
    onChange: (value: HeaderFilterValue) => void;
};

const HeaderFilter = ({ value, onChange }: HeaderFilterProps) => {
    const options = useMemo<HeaderFilterOption[]>(
        () => [
            { id: 'rating', label: 'By rating' },
            { id: 'descending', label: 'Descending' },
            { id: 'ascending', label: 'Ascending' }
        ],
        []
    );

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isArrowFading, setIsArrowFading] = useState<boolean>(false);

    const activeLabel = options.find((o) => o.id === value)?.label ?? 'By rating';

    const toggleOpen = () => {
        setIsArrowFading(true);
        window.setTimeout(() => {
            setIsOpen((prev) => !prev);
            window.setTimeout(() => {
                setIsArrowFading(false);
            }, 180);
        }, 180);
    };

    const handleSelect = (id: HeaderFilterValue) => {
        onChange(id);
        setIsArrowFading(true);
        window.setTimeout(() => {
            setIsOpen(false);
            window.setTimeout(() => {
                setIsArrowFading(false);
            }, 180);
        }, 180);
    };

    return (
        <div className={`headerFilter${isOpen ? ' isOpen' : ''}`}>
            <button className="headerFilterMenu" type="button" onClick={toggleOpen} aria-expanded={isOpen}>
                <h6 className="headerFilterActual">{activeLabel}</h6>
                <img
                    src={isOpen ? filterArrowReverse : headerFilterArrow}
                    alt=""
                    loading="lazy"
                    className={`headerFilterArrow${isArrowFading ? ' isFading' : ''}`}
                />
            </button>

            <ul className="headerFilterList" role="listbox" aria-hidden={!isOpen}>
                {options
                    .filter((o) => o.id !== value)
                    .map((option) => (
                        <li className="headerFilterListItem" key={option.id}>
                            <button
                                type="button"
                                className={`headerFilterListButton${value === option.id ? ' isActive' : ''}`}
                                onClick={() => handleSelect(option.id)}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default HeaderFilter;
