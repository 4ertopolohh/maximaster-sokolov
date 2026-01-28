import { useLocation } from 'react-router-dom';

import Story from '../../components/Story/Story';
import '../CatalogPage/CatalogPage.scss';
import CatalogSection from './components/CatalogSection/CatalogSection';

type CatalogLocationState = {
    category?: unknown;
    categoryId?: unknown;
    categoryTitle?: unknown;
};

const CatalogPage = () => {
    const location = useLocation();
    const state = location.state as CatalogLocationState | null;

    const selectedCategoryId =
        typeof state?.categoryId === 'string' ? state.categoryId : undefined;

    const selectedCategoryTitle =
        typeof state?.categoryTitle === 'string'
            ? state.categoryTitle
            : typeof state?.category === 'string'
                ? state.category
                : undefined;

    return (
        <main className="page">
            <Story />
            <CatalogSection
                selectedCategoryId={selectedCategoryId}
                selectedCategoryTitle={selectedCategoryTitle}
            />
        </main>
    );
};

export default CatalogPage;
