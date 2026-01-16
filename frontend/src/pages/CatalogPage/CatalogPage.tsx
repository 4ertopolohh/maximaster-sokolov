import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../CatalogPage/CatalogPage.scss'

const CatalogPage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='Catalog'/>
    </main>
  )
}

export default CatalogPage;