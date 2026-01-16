import InDevSection from '../../components/InDevSection/InDevSection';
import '../HomePage/HomePage.scss'
import CategoriesSection from './components/CategoriesSection/CategoriesSection';
import DiscountSection from './components/DiscountSection/DiscountSection';
import MiniCatalogSection from './components/MiniCatalogSection/MiniCatalogSection';
import PopularProductsSection from './components/PopularProductsSection/PopularProductsSection';
import PromoBannersSection from './components/PromoBannersSection/PromoBannersSection';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';

const HomePage = () => {
  return (
    <main className="page">
      <WelcomeSection />
      <PromoBannersSection />
      <CategoriesSection />
      <MiniCatalogSection />
      <PopularProductsSection />
      <DiscountSection />
      <InDevSection sectionName='Home'/>
    </main>
  )
}

export default HomePage;