import InDevSection from '../../components/InDevSection/InDevSection';
import '../HomePage/HomePage.scss'
import CategoriesSection from './components/CategoriesSection/CategoriesSection';
import PromoBannersSection from './components/PromoBannersSection/PromoBannersSection';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';

const HomePage = () => {
  return (
    <main className="page">
      <WelcomeSection />
      <PromoBannersSection />
      <CategoriesSection />
      <InDevSection sectionName='Home'/>
    </main>
  )
}

export default HomePage;