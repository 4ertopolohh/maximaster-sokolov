import InDevSection from '../../components/InDevSection/InDevSection';
import '../HomePage/HomePage.scss'
import CategoriesSection from './components/CategoriesSection/CategoriesSection';
import MiniCatalogSection from './components/MiniCatalogSection/MiniCatalogSection';
import PromoBannersSection from './components/PromoBannersSection/PromoBannersSection';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';

const HomePage = () => {
  return (
    <main className="page">
      <WelcomeSection />
      <PromoBannersSection />
      <CategoriesSection />
      <MiniCatalogSection />
      <InDevSection sectionName='Home'/>
    </main>
  )
}

export default HomePage;