import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../AboutPage/AboutPage.scss'

const AboutPage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='About Us'/>
    </main>
  )
}

export default AboutPage;