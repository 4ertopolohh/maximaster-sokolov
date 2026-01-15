import '../MiniCatalogSection/MiniCatalogSection.scss'
import MiniCatalogSectionHeader from '../MiniCatalogSectionHeader/MiniCatalogSectionHeader';

const MiniCatalogSection = () => {
    return(
        <section className='miniCatalogSection'>
            <div className='container'>
                <MiniCatalogSectionHeader />
            </div>
        </section>
    )
}

export default MiniCatalogSection;