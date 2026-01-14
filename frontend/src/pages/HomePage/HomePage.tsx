import InDevSection from '../../components/InDevSection/InDevSection';
import '../HomePage/HomePage.scss'
import WelcomeSection from './components/WelcomeSection/WelcomeSection';

const HomePage = () => {
  return (
    <main className="page">
      <WelcomeSection />
        <InDevSection sectionName='Home'/>
    </main>
  )
}

export default HomePage;