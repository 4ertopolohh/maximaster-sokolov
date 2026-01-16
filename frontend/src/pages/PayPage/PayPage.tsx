import InDevSection from '../../components/InDevSection/InDevSection';
import Story from '../../components/Story/Story';
import '../PayPage/PayPage.scss'

const PayPage = () => {
  return (
    <main className="page">
        <Story />
        <InDevSection sectionName='Payment'/>
    </main>
  )
}

export default PayPage;