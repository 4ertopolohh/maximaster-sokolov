import { useLocation } from 'react-router-dom';

// import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../CatalogPage/CatalogPage.scss';
import CatalogSection from './components/CatalogSection/CatalogSection';

type CatalogLocationState = {
    category?: string;
};

const CatalogPage = () => {
    const location = useLocation();
    const state = location.state as CatalogLocationState | null;

    return (
        <main className="page">
            <Story />
            <CatalogSection selectedCategory={state?.category} />
            {/* <InDevSection sectionName="Catalog" /> */}
        </main>
    );
};

export default CatalogPage;
