import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../ProfilePage/ProfilePage.scss'

const ProfilePage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='Profile'/>
    </main>
  )
}

export default ProfilePage;