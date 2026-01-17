import '../CatalogProductsHeader/CatalogProductsHeader.scss';
import HeaderFilter from '../HeaderFilter/HeaderFilter';
import type { HeaderFilterValue } from '../HeaderFilter/HeaderFilter';

export type CatalogProductsHeaderProps = {
    count: string;
    sortValue: HeaderFilterValue;
    onSortChange: (value: HeaderFilterValue) => void;
};

const CatalogProductsHeader = ({ count, sortValue, onSortChange }: CatalogProductsHeaderProps) => {
    return (
        <div className="catalogProductsHeader">
            <h3 className="catalogProductsHeaderCount">
                Selected Products:<span>{count}</span>
            </h3>
            <HeaderFilter value={sortValue} onChange={onSortChange} />
        </div>
    );
};

export default CatalogProductsHeader;
