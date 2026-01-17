import CatalogSectionFilter from '../CatalogSectionFilter/CatalogSectionFilter';
import type { CatalogSectionFilterItem } from '../CatalogSectionFilter/CatalogSectionFilter';
import '../CatalogSectionFilters/CatalogSectionFilters.scss';

export type CatalogSectionFilterBlock = {
    id: string;
    title: string;
    items: CatalogSectionFilterItem[];
};

type CatalogSectionFiltersProps = {
    filters: CatalogSectionFilterBlock[];
};

const CatalogSectionFilters = ({ filters }: CatalogSectionFiltersProps) => {
    return (
        <div className="catalogSectionFilters">
            {filters.map((filter) => (
                <CatalogSectionFilter key={filter.id} title={filter.title} items={filter.items} />
            ))}
        </div>
    );
};

export default CatalogSectionFilters;
