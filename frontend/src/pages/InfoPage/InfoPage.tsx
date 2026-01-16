import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../InfoPage/InfoPage.scss'

const InfoPage = () => {
  return (
    <main className="page">
      <Story />
        <InDevSection sectionName='Info'/>
    </main>
  )
}

export default InfoPage;