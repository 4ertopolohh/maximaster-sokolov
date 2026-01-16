import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../ContactUsPage/ContactUsPage.scss'

const ContactUsPage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='Contacts'/>
    </main>
  )
}

export default ContactUsPage;