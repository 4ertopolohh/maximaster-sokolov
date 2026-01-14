import InDevSection from '../../components/InDevSection/InDevSection';
import '../HomePage/HomePage.scss'
import PromoBannersSection from './components/PromoBannersSection/PromoBannersSection';
import WelcomeSection from './components/WelcomeSection/WelcomeSection';

const HomePage = () => {
  return (
    <main className="page">
      <WelcomeSection />
      <PromoBannersSection />
      <InDevSection sectionName='Home'/>
    </main>
  )
}

export default HomePage;